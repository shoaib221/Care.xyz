import { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);






// export default function RootLayout({ children }) {
//     return (
//         <html lang="en">
//             <body>
//                 <ThemeProvider>{children}</ThemeProvider>
//             </body>
//         </html>
//     );
// }


// 'use client';

// import { useTheme } from '../context/ThemeContext';

// export default function HomePage() {
//     const { theme, toggleTheme } = useTheme();

//     return (
//         <div>
//             <h1>Current Theme: {theme}</h1>
//             <button onClick={toggleTheme}>Toggle Theme</button>
//         </div>
//     );
// }

