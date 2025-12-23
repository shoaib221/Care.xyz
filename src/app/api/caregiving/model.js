import mongoose from 'mongoose';
import { Types } from 'mongoose';


const ServiceSchema = new mongoose.Schema({
    name: {
        type: String
    },
    costPerHour: {
        type: Number
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    availability: {
        type: String
    }
});


export const Service = mongoose.models.Service || mongoose.model("Service", ServiceSchema);

const BookingSchema = new mongoose.Schema({
    startTime: {
        type: Date,
    },
    endTime: {
        type: Date
    },
    totalCost: {
        type: Number,
        required: true,
        default: 0
    },
    division: {
        type: String,
        required: true,
        default: 'Sylhet'
    },
    district: {
        type: String,
        required: true,
        default: "Sylhet"
    },
    city: {
        type: String,
        required: true,
        default: "Sylhet"
    },
    address: {
        type: String
    },
    booker_id : {
        type: Types.ObjectId,
    },
    service_id: {
        type: Types.ObjectId
    },
    status: {
        tupe: String,
        required: true,
        default: "pending"
    }, 
    paymentStatus: {
        type: String,
        required: true,
        default: "unpaid"
    }
    
});


export const Booking = mongoose.models.Booking || mongoose.model("Booking", BookingSchema);

