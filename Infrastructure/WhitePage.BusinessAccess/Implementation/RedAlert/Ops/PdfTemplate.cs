﻿using System.Text;
using WhitePage.Entities.RedAlert;

namespace WhitePage.BusinessAccess.Implementation.Ops
{
    public class PdfTemplate
    {
        public string PlanningFormMailGenerator(ProgrammePlanning programmePlanningForm)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("<br/><br/> <hr size='5' style='background-color:#E00'/><br/>" +
                "<table cellpadding='10' style='border-spacing:15px 0rem; font-family:'Times New Roman', Times, serif; font-size:16px;'>" +
                "<tr><td style='width:350px;word-wrap:break-word;'>Planning Number :</td><td>");
            sb.Append(programmePlanningForm.PlanningNumber);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Planning Month and Year :</td><td>");
            sb.Append(programmePlanningForm.PlanningMonthAndYear);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Planning Category :</td><td>");
            sb.Append(programmePlanningForm.PlanningCategory);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Village Code  :</td><td>");
            sb.Append(programmePlanningForm.VillageCode);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Planned Pre-SVP date  :</td><td>");
            sb.Append(programmePlanningForm.PlannedPreSvpDate.ToShortDateString());
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Planned SVP date  :</td><td>");
            sb.Append(programmePlanningForm.PlannedSvpDate.ToShortDateString());
            sb.Append("</td></tr>");
            sb.Append("</table><br/><br/><hr size='5' style='background-color:#E00'/><br/>");

            return sb.ToString();
        }

        public string PreSVPMailGenerator(PreSvp preSvpForm)
        {
            StringBuilder sb = new StringBuilder();

            sb.Append("<br/><br/> <hr size='5' style='background-color:#E00'/><br/>" +
                "<table cellpadding='10' style='border-spacing:15px 0rem; font-family:'Times New Roman', Times, serif; font-size:16px;'>" +
                "<tr><td style='width:350px;word-wrap:break-word;'>Pre-SVP Number :</td><td>");
            sb.Append(preSvpForm.PreSvpNumber);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Village Code :</td><td>");
            sb.Append(preSvpForm.VillageCode);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Pre-SVP Date :</td><td>");
            sb.Append(preSvpForm.PreSvpDate.ToShortDateString());
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>One Way distance to village(kms) :</td><td>");
            sb.Append(preSvpForm.DistanceToVillageInKms);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Village Location description :</td><td>");
            sb.Append(preSvpForm.LocationDesc);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Major source of income :</td><td>");
            sb.Append(preSvpForm.MajorSourceOfIncome);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Details of active Community Groups (SHG/CVC) to facilitate the program:</td><td>");
            sb.Append(preSvpForm.ActiveCommunityGroup);
            sb.Append("</td></tr>");
            sb.Append("<tr><td><br/></td><td><br/></td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Child Abuse count :</td><td>");
            sb.Append(preSvpForm.ChildAbuseCount);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Domestic violence case count :</td><td>");
            sb.Append(preSvpForm.DomesticViolenceCasesCount);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Trafficking cases count :</td><td>");
            sb.Append(preSvpForm.TraffickingCasesCount);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Missing cases count :</td><td>");
            sb.Append(preSvpForm.MissingCasesCount);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>School drop out count :</td><td>");
            sb.Append(preSvpForm.SchoolDropoutsCount);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Details of any trafficking-prone villages in neighbourhood :</td><td>");
            sb.Append(preSvpForm.NeighbouringTrafficProneDesc);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Local issues :</td><td>");
            sb.Append(preSvpForm.LocalIssuesDesc);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Awareness about trafficking :</td><td>");
            sb.Append(preSvpForm.AwarenessDesc);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Causes of trafficking description :</td><td>");
            sb.Append(preSvpForm.TraffickingCausesDesc);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Previous Anti-Trafficking awarness programs :</td><td>");
            sb.Append(preSvpForm.PreviousAwareness);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Details of previous anti-tracking awareness program :</td><td>");
            sb.Append(preSvpForm.PreviousAwarenessDesc);
            sb.Append("</td></tr>");
            sb.Append("</table><br/><br/><hr size='5' style='background-color:#E00'/><br/>");

            return sb.ToString();
        }

        public string SVPMailGenerator(Svp svpForm)
        {
            StringBuilder sb = new StringBuilder();

            sb.Append("<br/><br/> <hr size='5' style='background-color:#E00'/><br/>" +
                "<table cellpadding='10' style='border-spacing:15px 0rem; font-family:'Times New Roman', Times, serif; font-size:16px;'>" +
                "<tr><td style='width:350px;word-wrap:break-word;'>SVP Number :</td><td>");
            sb.Append(svpForm.SvpNumber);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Village Code :</td><td>");
            sb.Append(svpForm.VillageCode);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>SVP Date :</td><td>");
            sb.Append(svpForm.SvpDate.ToShortDateString());
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Travel Hours :</td><td>");
            sb.Append(svpForm.TravelHours);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Total Campaign hours :</td><td>");
            sb.Append(svpForm.TotalCampaignHours);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Field Workers :</td><td>");
            sb.Append(svpForm.FieldWorkerNames);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>ORA/QC visited the program :</td><td>");
            sb.Append(svpForm.ORAVisited);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Confiremed Domestic Violence count :</td><td>");
            sb.Append(svpForm.ConfirmedDomesticViolenceCasesCount);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Confirmed Trafficking cases count :</td><td>");
            sb.Append(svpForm.ConfirmedTraffickingCasesCount);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Confirmed Child Abuse cases count:</td><td>");
            sb.Append(svpForm.ConfirmedChildAbuseCount);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Confirmed Missing cases count :</td><td>");
            sb.Append(svpForm.ConfirmedMissingCasesCount);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Confirmed School Dropouts count :</td><td>");
            sb.Append(svpForm.ConfirmedSchoolDropoutsCount);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'> Details of any neighbourhood trafficking prone villages :</td><td>");
            sb.Append(svpForm.NeighbouringTrafficProneDesc);
            sb.Append("</td></tr>");
            sb.Append("<tr><td><br/></td><td><br/></td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Mothers participation count :</td><td>");
            sb.Append(svpForm.MothersParticipationCount);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Mothers Feedback :</td><td>");
            sb.Append(svpForm.MothersFeedback);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Fathers participation count :</td><td>");
            sb.Append(svpForm.FathersParticipationCount);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Fathers Feedback :</td><td>");
            sb.Append(svpForm.FathersFeedback);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Name of the School where program was conducted :</td><td>");
            sb.Append(svpForm.SchoolName);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>School participation count :</td><td>");
            sb.Append(svpForm.SchoolParticipationCount);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>School program Feedback :</td><td>");
            sb.Append(svpForm.SchoolFeedback);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Village Leaders and Elders participation count :</td><td>");
            sb.Append(svpForm.EldersParticipationCount);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Village Elders Feeedback :</td><td>");
            sb.Append(svpForm.EldersFeedback);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Movie participation count :</td><td>");
            sb.Append(svpForm.MovieParticipationCount);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Total participants :</td><td>");
            sb.Append(svpForm.TotalParticipationCount);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Has Rakshak been instituted/identified ? :</td><td>");
            sb.Append(svpForm.IsRakshakInstituted);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Distributed comic books count :</td><td>");
            sb.Append(svpForm.ComicBooksCount);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Total SVP cost :</td><td>");
            sb.Append(svpForm.TotalSvpCost);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Village Elder name :</td><td>");
            sb.Append(svpForm.ElderName);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Village Elder designation :</td><td>");
            sb.Append(svpForm.ElderDesignation);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Village Elder phone number :</td><td>");
            sb.Append(svpForm.ElderContactNumber);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Name of Police personnel :</td><td>");
            sb.Append(svpForm.PoliceName);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Police designation :</td><td>");
            sb.Append(svpForm.PoliceDesignation);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Police phone number :</td><td>");
            sb.Append(svpForm.PoliceContactNumber);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Summary  :</td><td>");
            sb.Append(svpForm.Summary);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Positive feedback about program from participants :</td><td>");
            sb.Append(svpForm.PositiveFeedback);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Challenges faced throughout the program :</td><td>");
            sb.Append(svpForm.ChallengesDesc);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Is Follow up program required description :</td><td>");
            sb.Append(svpForm.IsFollowUpRequiredDesc);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Recommendations for next steps :</td><td>");
            sb.Append(svpForm.Recommendations);
            sb.Append("</td></tr>");
            sb.Append("</table><br/><br/><hr size='5' style='background-color:#E00'/><br/>");

            return sb.ToString();
        }

        public string RevisitFormMailGenerator(Revisit revisitForm)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("<br/><br/> <hr size='5' style='background-color:#E00'/><br/>" +
                "<table cellpadding='10' style='border-spacing:15px 0rem; font-family:'Times New Roman', Times, serif; font-size:16px;'>" +
                "<tr><td style='width:350px;word-wrap:break-word;'>Planning Number :</td><td>");
            sb.Append(revisitForm.RevisitNumber);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Village Code :</td><td>");
            sb.Append(revisitForm.VillageCode);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Revisit Date :</td><td>");
            sb.Append(revisitForm.RevisitDate.ToShortDateString());
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Traffic count before SVP :</td><td>");
            sb.Append(revisitForm.TrafficCountBeforeSVP);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Traffic count after SVP :</td><td>");
            sb.Append(revisitForm.TrafficCountAfterSVP);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Child marriage count before SVP :</td><td>");
            sb.Append(revisitForm.ChildMarriageCountBeforeSVP);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Child marriage count after SVP :</td><td>");
            sb.Append(revisitForm.ChildMarriageCountAfterSVP);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Is village safe ? Give reasons :</td><td>");
            sb.Append(revisitForm.IsVillageSafeForGirlsDesc);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Is Strategic Networking Helpful ? :</td><td>");
            sb.Append(revisitForm.IsStrategicNetworkingHelpful);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Is Village/School leadership helpful in anti-trafficking efforts ? :</td><td>");
            sb.Append(revisitForm.IsVillageLeadershipHelpful);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Is CVC active in Anti-Trafficking efforts ? :</td><td>");
            sb.Append(revisitForm.IsCVCActive);
            sb.Append("</td></tr>");
            sb.Append("<tr><td><br/></td><td><br/></td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'> Do Fathers remember SVP and message ? :</td><td>");
            sb.Append(revisitForm.DoFathersRememberSVP);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Feedback from Fathers :</td><td>");
            sb.Append(revisitForm.FathersFeedback);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'> Do Mothers remember SVP and message ? :</td><td>");
            sb.Append(revisitForm.DoMothersRememberSVP);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Feedback from Mothers :</td><td>");
            sb.Append(revisitForm.MothersFeedback);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'> Do Girls remember SVP and message ? :</td><td>");
            sb.Append(revisitForm.DoGirlsRememberSVP);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Feedback from Girls :</td><td>");
            sb.Append(revisitForm.GirlsFeedback);
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'> Do Boys remember SVP and message ? :</td><td>");
            sb.Append(revisitForm.DoBoysRememberSVP);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Feedback from Boys :</td><td>");
            sb.Append(revisitForm.BoysFeedback);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'> Do Village leaders remember SVP and message ? :</td><td>");
            sb.Append(revisitForm.DoVillageEldersRememberSVP);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Feedback from Village Elders :</td><td>");
            sb.Append(revisitForm.VillageEldersFeedback);
            sb.Append("</td></tr>");
            sb.Append("<tr><td><br/></td><td><br/></td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'> Do police remember SVP and message ? :</td><td>");
            sb.Append(revisitForm.DoPoliceRememberSVP);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Feedback from police :</td><td>");
            sb.Append(revisitForm.PoliceFeedback);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Contact number of responsible Village Elders :</td><td>");
            sb.Append(revisitForm.VillageElderContactNumber);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Contact number of responsible police official :</td><td>");
            sb.Append(revisitForm.PoliceContactNumber);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'> Do School staff remember SVP and message ? :</td><td>");
            sb.Append(revisitForm.DoSchoolStaffRememberSVP);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Feedback from School Staff :</td><td>");
            sb.Append(revisitForm.SchoolStaffFeedback);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Contact number of school Headmaster/Principal :</td><td>");
            sb.Append(revisitForm.SchoolPrincipalContactNumber);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Was skit conducted ? :</td><td>");
            sb.Append(revisitForm.WasSkitConducted);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Success story about SVP :</td><td>");
            sb.Append(revisitForm.SVPSuccessStory);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Summary of Feedback about the Program :</td><td>");
            sb.Append(revisitForm.ProgrammeFeedbackSummary);
            sb.Append("</td></tr>");
            sb.Append("<tr><td><br/></td><td><br/></td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Challenges that caused ineffective implementation of SVP :</td><td>");
            sb.Append(revisitForm.SVPImplementationChallenges);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Were any calls made to ORA helpline ? :</td><td>");
            sb.Append(revisitForm.WereCallsMadeToORAHelpline);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Is the village highly trafficking prone to conduct another SVP ?:</td><td>");
            sb.Append(revisitForm.IsAnotherSVPRequired);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Recommendations for next steps :</td><td>");
            sb.Append(revisitForm.NextStepsRecommendations);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Comic book count :</td><td>");
            sb.Append(revisitForm.ComicBooksCount);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Students participation count :</td><td>");
            sb.Append(revisitForm.StudentsParticipationCount);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Was Rakshak identified ?.Details :</td><td>");
            sb.Append(revisitForm.RakshakDesc);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Was helpline number mentioned to all stakeholders ? :</td><td>");
            sb.Append(revisitForm.WasHelplineNumberMentioned);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Summary of Revisit activity :</td><td>");
            sb.Append(revisitForm.RevisitSummary);
            sb.Append("</td></tr>");
            sb.Append("</table><br/><br/><hr size='5' style='background-color:#E00'/><br/>");

            return sb.ToString();
        }

        public string PreSvpQCFormMailGenerator(PreSvpQC preSvpQCForm)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("<br/><br/> <hr size='5' style='background-color:#E00'/><br/>" +
                "<table cellpadding='10' style='border-spacing:15px 0rem; font-family:'Times New Roman', Times, serif; font-size:16px;'>" +
                "<tr><td style='width:350px;word-wrap:break-word;'>Pre-SVP QC Number :</td><td>");
            sb.Append(preSvpQCForm.PreSvpQCNumber);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Village Code :</td><td>");
            sb.Append(preSvpQCForm.VillageCode);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Stakeholder Description :</td><td>");
            sb.Append(preSvpQCForm.StakeholdersDescription);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>IP Facilator Communication skill level :</td><td>");
            sb.Append(preSvpQCForm.IpFacilitatorCommunicationSkillLevel);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>CVC Status :</td><td>");
            sb.Append(preSvpQCForm.CVCStatus);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Logistic arangements done according to Pre-SVP guidelines :</td><td>");
            sb.Append(preSvpQCForm.WasLogisticArrangementsMade);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Are the villagers looking forward for the SVP ? :</td><td>");
            sb.Append(preSvpQCForm.AreVillagersInterested);
            sb.Append("</td></tr>");
            sb.Append("<tr><td style = 'width:350px; word-wrap: break-word;'>Summary :</td><td>");
            sb.Append(preSvpQCForm.Summary);
            sb.Append("</td></tr>");
            sb.Append("</table><br/><br/><hr size='5' style='background-color:#E00'/><br/>");

            return sb.ToString();
        }
    }
}