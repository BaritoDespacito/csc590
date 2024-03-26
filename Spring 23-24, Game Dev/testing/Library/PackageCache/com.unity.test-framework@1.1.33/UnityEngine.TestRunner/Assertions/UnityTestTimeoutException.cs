using System;
using NUnit.Framework;
using NUnit.Framework.Interfaces;

namespace UnityEngine.TestTools.TestRunner
{
    internal class UnityTestTimeoutException : ResultStateException
    {
        public UnityTestTimeoutException(int timeout)
            : base(BuildMessage(timeout))
        {
        }

        private static string BuildMessage(int timeout)
        {
<<<<<<<< HEAD:Spring 23-24, Game Dev/testing/Library/PackageCache/com.unity.test-framework@1.1.33/UnityEngine.TestRunner/Assertions/UnityTestTimeoutException.cs
            return string.Format("Timeout value of {0}ms was exceeded", timeout);
========
            return string.Format("Timeout value of {0} ms was exceeded. If this is intended, increase the timeout value using a TimeoutAttribute.", timeout);
>>>>>>>> 0c056c51eea347ccf20c100943337fbb136daf12:Spring 23-24, Game Dev/Terrain2/Library/PackageCache/com.unity.test-framework@1.3.9/UnityEngine.TestRunner/Assertions/UnityTestTimeoutException.cs
        }

        public override ResultState ResultState
        {
            get { return ResultState.Failure; }
        }

        public override string StackTrace
        {
            get { return ""; }
        }
    }
}
