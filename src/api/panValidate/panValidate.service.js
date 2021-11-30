const moment = require('moment');
var errorStatus = null;
var AppID;
var gTempDS;

// var LogFile = ConfigurationSettings.AppSettings("LogFile");

const PAN_Validation = function (req) {
    try {
        var StartTime = GetDateAndTime();
        console.log(StartTime);
        if (!(_CheckAMC(req.body.AMCCode))) {
            throw new Error("Invalid AMC Code");
        }
        CheckIns(req.body.AMCCode,req.body.ApplicationId)
        console.log(req.body.AMCCode,req.body.ApplicationId)

        KYC_Status(req.body.AMCCode,req.body.ApplicationId,req.body.Password,req.body.PANNo)
        console.log(req.body.AMCCode,req.body.ApplicationId,req.body.Password,req.body.PANNo)

        f_owner_arc(req.body.AMCCode)
        console.log(req.body.AMCCode)

        ApplID()
        // var filePath = _SetFilePath(LogFile, AMCCode);
        // console.log(filePath)
        // var ResponseTimeLog = ConfigurationSettings.AppSettings(req.body.AMCCode + "_ElapsedTime") 
        // WS_Bussinesscom.WS_Bussinesscom.ModuleName = "PAN_Validation"
    } catch (e) {
        return e;
    }
}

const GetDateAndTime = function () {
    var SetTime;
    try {
        SetTime = moment().format("DD-MMM-YYYY HH:mm:ss")
        return SetTime;
    } catch (e) {
        return e;
    }
}

const _CheckAMC = function (AMCCode) {
    console.log("AMCCODE",AMCCode)
    try {
        if (AMCCode && (AMCCode.trim() == 'D' || AMCCode.trim() == 'TD')) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        return e;
    }
}

// const _SetFilePath = function(logFile,AMCCode){
//     LogPath = ConfigurationSettings.AppSettings("LogPath").toString()
//     console.log("logfile",logFile,"AMCCode",AMCCode)
//     try{
//         if (logFile = 'Y'){
//             return logPath & "\Services_" & AMCCode.trim() & SetTime("DD-MMM-YYYY") & ".log".ToString() 
//         }else{
//             return ""
//         }
//     }catch(e){
//         return e;
//     }
// }

const CheckIns = function(AMCCode,Applicationid){
    var emptyCheck = '';
    try{
        if(AMCCode.length == 0) {
            emptyCheck = 'AMC Code'
        }
        if(Applicationid.length == 0){
            if(emptyCheck.length == 0){
                emptyCheck = 'ApplicationId'
            }
            if(emptyCheck.length == 0){
                emptyCheck = 'Enter' + emptyCheck
                return emptyCheck
            }
        }
    }catch(e){
        return e
    }
}

const KYC_Status = function(AMCCode,ApplicationId,Password,PANNo){
    var emptyString = CheckIns(AMCCode,ApplicationId)
    try{
        if(Password.length == 0){
            if(emptyString == null){
                emptyString = "Enter the Password"
            }else{
                emptyString = emptyString +',Password'
            }
        }
           if(PANNo.length == 0){
                if(emptyString == null){
                emptyString = "Enter the PANNo"
            }else{
                emptyString = emptyString +',PANNo'
            }
        }
        if(!emptyString == null){
            errorStatus = "Please enter" + emptyString.replace("Enter", "")
        }
        
    }catch(e){
        return e
    }
}

var f_owner_arc = function(AMCCode){
    try{
        switch(AMCCode) {
            case "TB":
                f_owner_arc = "MFBMF_ARC."
                break;  
        }
    }catch(e){
        return e
    }
}

const ApplID = function(){
    try{
        if(ApplicationId == "CAMSONLINE"){
            AppID = "CAMSONLINE"
        }else{
            if(amccode == 'TB' || amccode == 'B' && ApplicationId == "CAMSWS_TALISMA"){
                AppID = "CAMSWS_TALISMA"
            }
        }
    }catch(e){
        return e;
    }
}

const f_CAMSREP_OwnerID = function(AMCCode){
    var OwnerID = " "
    try{
        if (AMCCode == "TP"){
            OwnerID = "ITREP."
        }else if (AMCCode == "P" ) {
            OwnerID = "CAMSREP."
        }
        return OwnerID
    }catch(e){
        return e
    }
}

const CheckPassword = function(AMCCode,UserID,Password,){
    try{
        if(UserID.toUpperCase() != "CAMSWS" && UserID.toUpperCase() != "CAMSONLINE" && UserID.toUpperCase() != "CAMSWS_TALISMA" && UserID.toUpperCase() != "CAMSWS_CC" && UserID.toUpperCase() != "CAMSREP" && UserID.toUpperCase() != "CAMSHS" && UserID.toUpperCase() != "CAMSWSVIS" && UserID.toUpperCase() != "CAMSWSDIST"){
            return("ECheck", "3", AMCCode, "Invalid Application ID", "", "F");
        }
        if(UserID.toUpperCase() == "CAMSREP"){
            gTempDS = ("INSAUTH", UserID, Password, "", "", AMCCode,f_CAMSREP_OwnerID(AMCCode), "", "True")
        }
        if(gTempDS.Tables.Count > 0){
            if(gTempDS.Tables(0).Rows.Count > 0){
                if(gTempDS.Tables(0).Rows(0).Item("DISABLE_LOGIN") = "Y"){
                    return("ECheck", "34", AMCCode, "Invalid User ID or Password", "", "F")
                }
                return getArrangeData(gTempDS)
            }else{
                return("ECheck", "34", AMCCode, "Invalid User ID or Password", "", "F")
            }
        }else{
            gTempDS = ("", "PWDCHECK", "", "", UserID, Password, AMCCode, "", 0, 0, "")
            if(gTempDS.Tables.Count > 0){
                if(gTempDS.Tables(0).Rows.Count > 0){
                    if(gTempDS.Tables(0).Rows(0).Item("DISABLE_LOGIN") = "Y"){
                        return ("ECheck", "34", AMCCode, "Invalid User ID or Password", "", "F")
                    }
                    return getArrangeData(gTempDS)
                }else{
                    return("ECheck", "34", AMCCode, "Invalid User ID or Password", "", "F")
                }
            }
        }
    }catch(e){
        throw new ApplicationException("CheckPassword: " & ex1.Message)
    }
}

const web_procD = function(ApplicationId,ls_flag,ls_folio,ls_chk_digit,ls_name,ls_pin,ls_amc,ls_fol_arr,li_msgid,li_temptrxnslno,ls_brok_dlr_code,FIlsPath,ClientIP){
    try{
        errorStatus = ""
        if(ls_amc != "KVY"){
            if(f_owner_arc(ls_amc) == "NO"){
                errorStatus = "Invalid AMC Code"
                return ("ECheck","2",ls_amc,errorStatus)
            }
        }else{
            ls_amc = "TP"
        }
        OwnerID = f_owner_arc(ls_amc)
        if(ls_amc == "SBANK_UAT" || ls_amc == "SBANK_LIVE"){
           OwnerID + "plp_web_proc_sbank"
        }else{
            OwnerID +"plp_web_proc_sbank"
        }

    }catch(e){
        return(e)
    }
}
module.exports = {
    PAN_Validation
}