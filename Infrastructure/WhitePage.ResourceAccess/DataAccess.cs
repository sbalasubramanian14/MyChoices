namespace WhitePage.ResourceAccess
{
    public abstract class DataAccess
    {
        protected IUnitOfWork unitOfWork;

        public DataAccess(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }
    }
}
