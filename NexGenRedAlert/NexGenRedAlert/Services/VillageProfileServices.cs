using NexGenRedAlert.Models;
using SQLite;
using System.Threading.Tasks;

namespace NexGenRedAlert.Services
{
    public class VillageProfileServices
    {
        readonly SQLiteAsyncConnection database;

        public VillageProfileServices(string dbPath)
        {
            database = new SQLiteAsyncConnection(dbPath);
            database.CreateTableAsync<VillageProfile>().Wait();
        }

        public async Task<VillageProfile> GetVillageAsync(string villageCode)
        {
            return await database.Table<VillageProfile>().Where(village => village.VillageCode == villageCode).FirstOrDefaultAsync();
        }
    }
}
