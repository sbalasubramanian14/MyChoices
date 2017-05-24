using Microsoft.VisualStudio.TestTools.UnitTesting;
using WhitePage.Utilities.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WhitePage.Utilities.Security.Tests
{
    [TestClass()]
    public class EncryptionManagerTests
    {
        [TestMethod()]
        public void DecryptTest()
        {
            EncryptionManager.Decrypt("dKPADax8LSyF2XuJaAMt6Q==");
            Assert.Fail();
        }
    }
}