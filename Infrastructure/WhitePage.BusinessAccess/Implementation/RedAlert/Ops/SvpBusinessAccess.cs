using WhitePage.BusinessAccess.Contracts.Ops;
using WhitePage.ResourceAccess.Contracts.Ops;
using WhitePage.Entities.RedAlert;

namespace WhitePage.BusinessAccess.Implementation.Ops
{
    public class SvpBusinessAccess : ISvpBusinessAccess
    {
        private ISvpDataAccess svpDataAccess;
        private PdfMailer pdfMailer = new PdfMailer();
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

        public void SendPlanningFormResponseMail(ProgrammePlanning programmePlanningForm)
        {
            var generatedPdfTemplateString = pdfTemplate.PlanningFormMailGenerator(programmePlanningForm);
            var implementingPartner = this.svpDataAccess.GetIpDetails(programmePlanningForm.CreatedBy);

            string subject = $"Team ORA - Confirmation: Planning Form {programmePlanningForm.PlanningNumber} Received ";
            string body = $"<img src='https://drive.google.com/uc?id=1Ri4dvgKuyRlK3MYxgqueIDO3OFyBKe5a'/> <br/>Dear {implementingPartner.NgoName}, " +
                    $"<br/><br/><br/>We received the planning details for the month of {programmePlanningForm.PlanningMonthAndYear}. " +
                    $"Please find the attached PDF for the submitted details.<br/><br/>Wish you all the best for the upcoming programs." +
                    $"<br/><br/>Team ORA";
            string pdfName = $"{programmePlanningForm.PlanningNumber}.pdf";

            pdfMailer.SendMailToUser(generatedPdfTemplateString, implementingPartner.UserName, subject, body, pdfName);
        }

        public void SendPreSVPFormResponseMail(PreSvp preSvpForm)
        {
            var generatedPdfTemplateString = pdfTemplate.PreSVPMailGenerator(preSvpForm);
            var implementingPartner = this.svpDataAccess.GetIpDetails(preSvpForm.CreatedBy);

            string subject = $"Team ORA - Confirmation: Pre-SVP Form {preSvpForm.PreSvpNumber} Received ";
            string body = $"<img src='https://drive.google.com/uc?id=1Ri4dvgKuyRlK3MYxgqueIDO3OFyBKe5a'/> <br/>Dear {implementingPartner.NgoName}, " +
                    $"<br/><br/><br/>We received the Pre-SVP form for the village code {preSvpForm.VillageCode}. " +
                    $"Please find the attached PDF for the submitted details.<br/><br/>Wish you all the best for the upcoming programs." +
                    $"<br/><br/>Team ORA"; ;
            string pdfName = $"{preSvpForm.PreSvpNumber}.pdf";

            pdfMailer.SendMailToUser(generatedPdfTemplateString, implementingPartner.UserName, subject, body, pdfName);
        }

        public void SendSVPFormResponseMail(Svp svpForm)
        {
            var generatedPdfTemplateString = pdfTemplate.SVPMailGenerator(svpForm);
            var implementingPartner = this.svpDataAccess.GetIpDetails(svpForm.CreatedBy);

            string subject = $"Team ORA - Confirmation: SVP Form {svpForm.SvpNumber} Received ";
            string body = $"<img src='https://drive.google.com/uc?id=1Ri4dvgKuyRlK3MYxgqueIDO3OFyBKe5a'/> <br/>Dear {implementingPartner.NgoName}, " +
                    $"<br/><br/><br/>We received the SVP form for the village code {svpForm.VillageCode}. " +
                    $"Please find the attached PDF for the submitted details.<br/><br/>Wish you all the best for the upcoming programs." +
                    $"<br/><br/>Team ORA"; ;
            string pdfName = $"{svpForm.SvpNumber}.pdf";

            pdfMailer.SendMailToUser(generatedPdfTemplateString, implementingPartner.UserName, subject, body, pdfName);
        }

        public void SendRevisitFormResponseMail(Revisit revisitForm)
        {
            var generatedPdfTemplateString = pdfTemplate.RevisitFormMailGenerator(revisitForm);
            var implementingPartner = this.svpDataAccess.GetIpDetails(revisitForm.CreatedBy);

            string subject = $"Team ORA - Confirmation: Revisit Form {revisitForm.RevisitNumber} Received ";
            string body = $"<img src='https://drive.google.com/uc?id=1Ri4dvgKuyRlK3MYxgqueIDO3OFyBKe5a'/> <br/>Dear {implementingPartner.NgoName}, " +
                    $"<br/><br/><br/>We received the Revisit form for the village code {revisitForm.VillageCode}. " +
                    $"Please find the attached PDF for the submitted details.<br/><br/>Wish you all the best for the upcoming programs." +
                    $"<br/><br/>Team ORA"; ;
            string pdfName = $"{revisitForm.RevisitNumber}.pdf";

            pdfMailer.SendMailToUser(generatedPdfTemplateString, implementingPartner.UserName, subject, body, pdfName);
        }
    }
}
