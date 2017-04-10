using System;

namespace WhitePage.ResourceAccess
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private MainDbContext _DbContext = default(MainDbContext);

        public MainDbContext DbContext
        {
            get
            {
                if (null == _DbContext) _DbContext = new MainDbContext();
                return _DbContext;
            }
        }

        public void ClearAll()
        {
            if (_DbContext != null) _DbContext.Dispose();
        }

        public void Dispose()
        {
            this.ClearAll();
        }
    }
}
