using Microsoft.Extensions.DependencyInjection;
using System;
using WhitePage.BusinessAccess.Contracts.Core;
using WhitePage.BusinessAccess.Contracts.Ops;
using WhitePage.BusinessAccess.Contracts.Security;
using WhitePage.BusinessAccess.Implementation.Core;
using WhitePage.BusinessAccess.Implementation.Ops;
using WhitePage.BusinessAccess.Implementation.RedAlert.Security;
using WhitePage.BusinessAccess.Implementation.Security;
using WhitePage.ResourceAccess;
using WhitePage.ResourceAccess.Contracts.Core;
using WhitePage.ResourceAccess.Contracts.Ops;
using WhitePage.ResourceAccess.Contracts.RedAlert.Security;
using WhitePage.ResourceAccess.Contracts.Security;
using WhitePage.ResourceAccess.Implementation.Core;
using WhitePage.ResourceAccess.Implementation.Ops;
using WhitePage.ResourceAccess.Implementation.RedAlert.Security;
using WhitePage.ResourceAccess.Implementation.Security;

namespace WhitePage.DIContainer
{
    public class ServiceLocator
    {
        #region Variables
        private static ServiceLocator _Instance = default(ServiceLocator);
        private static Object _syncLock = new object();

        private IServiceCollection _serviceCollection = default(IServiceCollection);
        private IServiceProvider _serviceProvider = default(IServiceProvider);

        #endregion

        #region Constructor
        private ServiceLocator()
        {

        }
        #endregion

        #region Methods
        public void LoadContainer(IServiceCollection services)
        {
            /*
             * Transient: A new instance of the type is used every time the type is requested.
             * Scoped: A new instance of the type is created the first time it’s requested within a given HTTP request, and then re-used for all subsequent types resolved during that HTTP request.
             * Singleton: A single instance of the type is created once, and used by all subsequent requests for that type.
             */
            _serviceCollection = services;

            //Common
            _serviceCollection.AddScoped<IUnitOfWork, UnitOfWork>();

            /// Peace Tracker services
            //Data Access
            _serviceCollection.AddTransient<ILoginDataAccess, LoginDataAccess>();
            _serviceCollection.AddTransient<ICaseDataAccess, CaseDataAccess>();
            _serviceCollection.AddTransient<ICommonDataAccess, CommonDataAccess>();

            //Business Access
            _serviceCollection.AddTransient<ILoginBusinessAccess, LoginBusinessAccess>();
            _serviceCollection.AddTransient<ICaseBusinessAccess, CaseBusinessAccess>();
            _serviceCollection.AddTransient<ICommonBusinessAccess, CommonBusinessAccess>();

            /// Red Alert services 
            //Data Access
            _serviceCollection.AddTransient<ISvpDataAccess, SvpDataAccess>();
            _serviceCollection.AddTransient<IRALoginDataAccess, RALoginDataAccess>();

            //Business Access
            _serviceCollection.AddTransient<ISvpBusinessAccess, SvpBusinessAccess>();
            _serviceCollection.AddTransient<IRALoginBusinessAccess, RALoginBusinessAccess>();
            
            //Build Service Provider
            _serviceProvider = services.BuildServiceProvider();
        }

        public T Get<T>()
        {
            return this._serviceProvider.GetService<T>();
        }

        #endregion

        #region Properties
        public static ServiceLocator Instance
        {
            get
            {
                lock (_syncLock)
                {
                    if (_Instance == null) _Instance = new ServiceLocator();
                }
                return _Instance;
            }
        }

        #endregion
    }
}
