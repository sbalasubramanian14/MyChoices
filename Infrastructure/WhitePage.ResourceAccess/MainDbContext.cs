using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using WhitePage.Entities.CaseManagement;
using WhitePage.Entities.RedAlert;
using WhitePage.Entities.Security;
using WhitePage.Utilities.Constants;

namespace WhitePage.ResourceAccess
{
    public class MainDbContext : DbContext
    {
        #region Constructor
        public MainDbContext()
        : base(ConnectionStrings.MAIN_CONNECTION_STRING)
        {            
            Database.SetInitializer<MainDbContext>(null);
            var objectContext = (this as IObjectContextAdapter).ObjectContext;
            objectContext.CommandTimeout = 60;
        }
        #endregion

        public DbSet<Center> Centers { get; set; }
        public DbSet<PeaceMaker> PeaceMakers { get; set; }
        public DbSet<Counselor> Counselors { get; set; }

        public DbSet<Lookup> Lookups { get; set; }
        public DbSet<LookupDetail> LookupDetails { get; set; }

        public DbSet<State> States { get; set; }
        public DbSet<City> Cities { get; set; }

        public DbSet<CaseStatus> CaseStatuses { get; set; }

        public DbSet<Case> Cases { get; set; }
        public DbSet<CaseAddress> Addresses { get; set; }
        public DbSet<vCaseAddress> vAddresses { get; set; }

        public DbSet<CaseChildren> Children { get; set; }
        public DbSet<vCaseChildren> vChildren { get; set; }
        public DbSet<CaseFamilyHouseHold> FamilyHouseHold { get; set; }
        public DbSet<CaseSpouse> Spouse { get; set; }
        public DbSet<CasePhysicalHealth> PhysicalHealth { get; set; }

        public DbSet<CaseHeader> CaseHeaders { get; set; }

        public DbSet<CaseOffender> Offenders { get; set; }
        public DbSet<vCaseOffender> vOffenders { get; set; }

        public DbSet<CaseAbuse> Abuse { get; set; }
        public DbSet<CaseManage> Manage { get; set; }

        public DbSet<CaseMental> Mental { get; set; }
        public DbSet<vCaseMental> vMental { get; set; }

        public DbSet<CaseSessionLog> SessionLogs { get; set; }
        public DbSet<vCaseSessionLog> vSessionLog { get; set; } 
        public DbSet<vCaseFeedback> vFeedback { get; set; }
        public DbSet<CaseFeedback> Feedback { get; set; }
        public DbSet<CaseLegal> Legal { get; set; }

        public DbSet<User> User { get; set; }
        public DbSet<SerialNumberTracker> SerialNumberTracker { get; set; }

        /// <summary>
        /// Red Alert Project DbContexts
        /// </summary>
        public DbSet<Svp> Svp { get; set; }
        public DbSet<PreSvp> PreSvp { get; set; }
        public DbSet<ProgrammePlanning> ProgrammePlanning { get; set; }
        public DbSet<SerialNumbertrackerRA> SerialNumbertrackerRA { get; set; }
        
        public DbSet<RedAlertUser> RedAlertUser { get; set; }
        public DbSet<Revisit> Revisit { get; set; }
    }
}
