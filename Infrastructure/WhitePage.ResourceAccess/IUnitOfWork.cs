namespace WhitePage.ResourceAccess
{
    public interface IUnitOfWork
    {
        MainDbContext DbContext { get; }

        void ClearAll();
    }
}
