import PdfPage from "../../components/PdfPage";
import JSONFile from "../../assets/json/approvalDocuments.json"



const ApprovalsDocuments = () =>{

    return(
        <PdfPage JSONFile={ JSONFile } />
    )


}

export default ApprovalsDocuments