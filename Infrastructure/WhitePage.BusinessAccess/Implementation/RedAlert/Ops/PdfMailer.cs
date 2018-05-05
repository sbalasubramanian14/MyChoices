using System.IO;
using System.Net.Mail;
using System.Net;

namespace WhitePage.BusinessAccess.Implementation.Ops
{
    public class PdfMailer
    {
        private const string FromMailID = "oranexgen@mychoicesfoundation.org";
        private const string MailPassword = "jvobndlfgppsmevs";
        private string _ccMailID;

        public PdfMailer( string ccMailID)
        {
            this._ccMailID = ccMailID;
        }
        public void SendMailToUser(string generatedPdfTemplateString, string IpMailID, string subject, string body, string pdfName)
        {

            var htmlToPdf = new NReco.PdfGenerator.HtmlToPdfConverter();
            var pdfBytes = htmlToPdf.GeneratePdf(generatedPdfTemplateString);

            MailMessage mailMessage = new MailMessage(FromMailID, IpMailID)
            {
                Subject = subject,
                Body = body,
                IsBodyHtml = true
            };
            mailMessage.CC.Add(_ccMailID);
            mailMessage.Attachments.Add(new Attachment(new MemoryStream(pdfBytes), pdfName));
            SmtpClient smtp = new SmtpClient
            {
                    Host = "smtp.gmail.com",
                    EnableSsl = true
            };

            NetworkCredential networkCredentialObj = new NetworkCredential
            {
                UserName = FromMailID,
                Password = MailPassword
            };
            smtp.UseDefaultCredentials = true;
            smtp.Credentials = networkCredentialObj;
            smtp.Port = 587;
            smtp.Send(mailMessage);
        }
    }
}
