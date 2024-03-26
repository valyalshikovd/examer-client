import TokenFieldComponent from "./Components/TokenFieldComponent";
import {useState} from "react";
import ExamComponent from "./Components/ExamComponent";
import AddExamComponent from "./Components/AddExamComponent";

function App() {
    const [checkToken, SetCheckToken] = useState(false);
    const [checkAddExam, SetCheckAddExam] = useState(false);
    const [token, setToken] = useState('')

    const handleSetToken = (value) => {
        console.log("токен изменен на " + value)
        setToken(value)
    }
    const handleCheckToken = (checkToken) => (
        SetCheckToken(!checkToken)
    )
    const handleCheckAddExam = (checkAddExam) => (
        SetCheckAddExam(!checkAddExam)
    )
    return (
        <div>
            {checkToken ? (
                <div>
                    {checkAddExam ? (
                        <AddExamComponent
                            checkToken={checkToken}
                            handleCheckToken={handleCheckToken}
                            checkAddExam={checkAddExam}
                            SetCheckAddExam={handleCheckAddExam}
                            setToken={handleSetToken}
                        />
                    ) : (
                        <ExamComponent token={token}></ExamComponent>
                    )}
                </div>
            ) : (
                <TokenFieldComponent checkToken={checkToken}
                                     handleCheckToken={handleCheckToken}
                                     checkAddExam={checkAddExam}
                                     SetCheckAddExam={handleCheckAddExam}
                                     setToken = {handleSetToken}>
                </TokenFieldComponent>
            )}
        </div>
    );
}

export default App;
