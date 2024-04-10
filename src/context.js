import React, {useState, useContext, useEffect} from "react";
import { useCallback } from "react";

const URL = "https://openlibrary.org/search.json?title=";
const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const [searchTerm, setSearchTerm] = useState("Harry Potter");
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [resultitle, setResultTitle] = useState("");

    const fetchBooks = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`${URL}${searchTerm}`);
            const data = await response.json();
            const {docs} = data;
            console.log(docs);
            
            if(docs) {
                const newBooks = docs.slice(0,20).map((bookSingle) => {
                    const {key, author_name, cover_i, first_publish_year, title} = bookSingle;

                    return {
                        id: key,
                        author: author_name ? author_name[0] : "No Author",
                        cover: cover_i,
                        year: first_publish_year,
                        title: title
                    }
                });

                setBooks(newBooks);
                if(newBooks.length > 0) {
                    setResultTitle("Search Results");
                } else {
                    setResultTitle("Sorry, no books found. Please search again.");
                }
            } else {
                setBooks([]);
                setResultTitle("Sorry, no books found. Please search again.");
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }}, [searchTerm]);

    useEffect(() => {
        fetchBooks();
    }, [searchTerm, fetchBooks]);

    return (
        <AppContext.Provider value={{searchTerm, setSearchTerm, books, loading, resultitle}}>
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export {AppContext, AppProvider};