using WhitePage.BusinessAccess.Contracts.Ops;
using WhitePage.ResourceAccess.Contracts.Ops;
using WhitePage.Entities.RedAlert;

namespace WhitePage.BusinessAccess.Implementation.Ops
{
    public class SvpBusinessAccess : ISvpBusinessAccess
    {
        private ISvpDataAccess svpDataAccess;
        private static string ipCCMailId = "manjula@mychoicesfoundation.org";
        private static string qcCCMailId = "vivian@mychoicesfoundation.org";
        private PdfMailer ipPdfMailer = new PdfMailer(ipCCMailId);
        private PdfMailer qcPdfMailer = new PdfMailer(qcCCMailId);
        private PdfTemplate pdfTemplate = new PdfTemplate();

        public SvpBusinessAccess(ISvpDataAccess svpDataAccess)
        {
            this.svpDataAccess = svpDataAccess;
        }

        public string SavePreSvpForm(PreSvp preSvpForm)
        {
            var preSVPNumber= this.svpDataAccess.SavePreSvpForm(preSvpForm);
            this.SendPreSVPFormResponseMail(preSvpForm);
            return preSVPNumber;
        }
        public string SaveSvpForm(Svp svpForm)
        {
            svpForm.TotalParticipationCount = (short)(svpForm.MothersParticipationCount
                                                + svpForm.FathersParticipationCount
                                                + svpForm.SchoolParticipationCount
                                                + svpForm.EldersParticipationCount
                                                + svpForm.MovieParticipationCount);
            var svpNumber = this.svpDataAccess.SaveSvpForm(svpForm);
            this.SendSVPFormResponseMail(svpForm);
            return svpNumber;
        }        

        public string SaveProgrammePlanningForm(ProgrammePlanning programmePlanningForm)
        {
            var planningNumber= this.svpDataAccess.SaveProgrammePlanningForm(programmePlanningForm);
            this.SendPlanningFormResponseMail(programmePlanningForm);
            return planningNumber;
        }

        public string SaveRevisitForm(Revisit revisitForm)
        {
            var revisitNumber= this.svpDataAccess.SaveRevisitForm(revisitForm);
            this.SendRevisitFormResponseMail(revisitForm);
            return revisitNumber;
        }

        public string SavePreSvpQCForm(PreSvpQC preSvpQCForm)
        {
            var preSvpQCNumber = this.svpDataAccess.SavePreSvpQCForm(preSvpQCForm);
            this.SendPreSvpQCFormResponseMail(preSvpQCForm);
            return preSvpQCNumber;
        }
        public void SendPlanningFormResponseMail(ProgrammePlanning programmePlanningForm)
        {
            var generatedPdfTemplateString = pdfTemplate.PlanningFormMailGenerator(programmePlanningForm);
            var redAlertUser = this.svpDataAccess.GetUserDetails(programmePlanningForm.CreatedBy);

            string subject = $"Team ORA - Confirmation: Planning Form {programmePlanningForm.PlanningNumber} Received ";
            string body = $"<img src='https://drive.google.com/uc?id=1Ri4dvgKuyRlK3MYxgqueIDO3OFyBKe5a'/> <br/>Dear {redAlertUser.Organization}, " +
                    $"<br/><br/><br/>We received the planning details for the month of {programmePlanningForm.PlanningMonthAndYear}. " +
                    $"Please find the attached PDF for the submitted details.<br/><br/>Wish you all the best for the upcoming programs." +
                    $"<br/><br/>Team ORA";
            string pdfName = $"{programmePlanningForm.PlanningNumber}.pdf";

            ipPdfMailer.SendMailToUser(generatedPdfTemplateString, redAlertUser.UserName, subject, body, pdfName);
        }

        public void SendPreSVPFormResponseMail(PreSvp preSvpForm)
        {
            var generatedPdfTemplateString = pdfTemplate.PreSVPMailGenerator(preSvpForm);
            var redAlertUser = this.svpDataAccess.GetUserDetails(preSvpForm.CreatedBy);

            string subject = $"Team ORA - Confirmation: Pre-SVP Form {preSvpForm.PreSvpNumber} Received ";
            string body = $"<img src='https://drive.google.com/uc?id=1Ri4dvgKuyRlK3MYxgqueIDO3OFyBKe5a'/> <br/>Dear {redAlertUser.Organization}, " +
                    $"<br/><br/><br/>We received the Pre-SVP form for the village code {preSvpForm.VillageCode}. " +
                    $"Please find the attached PDF for the submitted details.<br/><br/>Wish you all the best for the upcoming programs." +
                    $"<br/><br/>Team ORA"; ;
            string pdfName = $"{preSvpForm.PreSvpNumber}.pdf";

            ipPdfMailer.SendMailToUser(generatedPdfTemplateString, redAlertUser.UserName, subject, body, pdfName);
        }

        public void SendSVPFormResponseMail(Svp svpForm)
        {
            var generatedPdfTemplateString = pdfTemplate.SVPMailGenerator(svpForm);
            var redAlertUser = this.svpDataAccess.GetUserDetails(svpForm.CreatedBy);

            string subject = $"Team ORA - Confirmation: SVP Form {svpForm.SvpNumber} Received ";
            string body = $"<img src='https://drive.google.com/uc?id=1Ri4dvgKuyRlK3MYxgqueIDO3OFyBKe5a'/> <br/>Dear {redAlertUser.Organization}, " +
                    $"<br/><br/><br/>We received the SVP form for the village code {svpForm.VillageCode}. " +
                    $"Please find the attached PDF for the submitted details.<br/><br/>Wish you all the best for the upcoming programs." +
                    $"<br/><br/>Team ORA"; ;
            string pdfName = $"{svpForm.SvpNumber}.pdf";

            ipPdfMailer.SendMailToUser(generatedPdfTemplateString, redAlertUser.UserName, subject, body, pdfName);
        }

        public void SendRevisitFormResponseMail(Revisit revisitForm)
        {
            var generatedPdfTemplateString = pdfTemplate.RevisitFormMailGenerator(revisitForm);
            var redAlertUser = this.svpDataAccess.GetUserDetails(revisitForm.CreatedBy);

            string subject = $"Team ORA - Confirmation: Revisit Form {revisitForm.RevisitNumber} Received ";
            string body = $"<img src='https://drive.google.com/uc?id=1Ri4dvgKuyRlK3MYxgqueIDO3OFyBKe5a'/> <br/>Dear {redAlertUser.Organization}, " +
                    $"<br/><br/><br/>We received the Revisit form for the village code {revisitForm.VillageCode}. " +
                    $"Please find the attached PDF for the submitted details.<br/><br/>Wish you all the best for the upcoming programs." +
                    $"<br/><br/>Team ORA"; ;
            string pdfName = $"{revisitForm.RevisitNumber}.pdf";

            ipPdfMailer.SendMailToUser(generatedPdfTemplateString, redAlertUser.UserName, subject, body, pdfName);
        }

        public void SendPreSvpQCFormResponseMail(PreSvpQC preSvpQCForm)
        {
            var generatedPdfTemplateString = pdfTemplate.PreSvpQCFormMailGenerator(preSvpQCForm);
            var redAlertQCUser = this.svpDataAccess.GetUserDetails(preSvpQCForm.CreatedBy);

            string subject = $"Team ORA - Confirmation: Pre-SVP QC Form {preSvpQCForm.PreSvpQCNumber} Received ";
            string body = $"<img src='https://drive.google.com/uc?id=1Ri4dvgKuyRlK3MYxgqueIDO3OFyBKe5a'/> <br/>Dear {redAlertQCUser.PrimaryContact}, " +
                    $"<br/><br/><br/>We acknowledge the receipt of your Pre-SVP QC Visit report for the village code {preSvpQCForm.VillageCode}" +
                    $"Please find the attached PDF for the submitted details.<br/><br/>Let's strive to make our programs better and better and our impact bigger and bigger !" +
                    $"<br/><br/>Team ORA"; 
            string pdfName = $"{preSvpQCForm.PreSvpQCNumber}.pdf";

            qcPdfMailer.SendMailToUser(generatedPdfTemplateString, redAlertQCUser.UserName, subject, body, pdfName);
        }
    }
}
