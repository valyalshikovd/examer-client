import {BrowserRouter, Route, Link, Routes, useParams} from 'react-router-dom';
import Home from "./Components/Home";
import ExamComponent from "./Components/ExamComponent";

function App() {

    const TokenExam = () => {
        const { token } = useParams();
        return (<div><ExamComponent token={token}/></div>)
    };
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/"  element={<Home/>}/>
                    <Route path="/token/:token"  element={ <TokenExam/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
