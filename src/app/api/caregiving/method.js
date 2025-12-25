import { User } from "@/app/api/auth/model";
import { Booking, Service } from "./model";
import Stripe from "stripe";
import { SendMail } from "./send-invoice";
const stripe = new Stripe(process.env.STRIPE_KEY);
const YOUR_DOMAIN = 'http://localhost:3000'; // put in env

export const CreatePayment = async ( paymentInfo ) => {

    try {

        
        let paymentAmount = paymentInfo.totalCost ;

        let service = await Service.findOne({ _id: paymentInfo.service_id })
        let booker = await User.findOne({ _id: paymentInfo.booker_id })



        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'USD',
                        unit_amount: paymentAmount * 100,
                        product_data: {
                            name: service.name
                        }
                    },
                    quantity: 1
                },
            ],
            customer_email: booker.username,
            metadata: {
                bookingId: paymentInfo._id.toString()
            },
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${YOUR_DOMAIN}/payment/failed?session_id={CHECKOUT_SESSION_ID}`
        });

        return { url: session.url };


    } catch (err) {
        console.dir(err.message);
        return { error: err.message };
    }
}



export const AfterPayment = async ( data ) => {

    console.log("payment success")

    try {
        const { stripe_session_id } = data;
        const session = await stripe.checkout.sessions.retrieve(stripe_session_id)

        const bookingId = session.metadata.bookingId;

        let booking = await Booking.findOne({ _id: bookingId })
        let booker = await User.findById(booking.booker_id)
        let service = await Service.findById( booking.service_id )

        

        if (session.payment_status === "paid") {

            const updation = {
                paymentStatus: "paid",
                transId: session.payment_intent
            }

            const updatedBooking = await Booking.findByIdAndUpdate(
                bookingId,
                {
                    $set: updation
                },
                {
                    new: true,
                    runValidators: true,
                }
            );

            await SendMail( { booker, booking, service } )
            
            return {booker, service, booking: updatedBooking, stripe_status: "paid" }
        }


        return {
            
            stripe_status: session.status,
            booking, booker
        }

    } catch (err) {
        console.dir(err.message)
        return { error: err.message };
    }
}
