import TokenFieldComponent from "./TokenFieldComponent";
import {useState} from "react";
import ExamComponent from "./ExamComponent";
import AddExamComponent from "./AddExamComponent";

function Home() {
    const [checkToken, SetCheckToken] = useState(false);
    const [checkAddExam, SetCheckAddExam] = useState(false);
    const [token, setToken] = useState('')

    const handleSetToken = (value) => {
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

export default Home;
