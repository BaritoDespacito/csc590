using System;
using System.Collections.Generic;
using UnityEditor.TestTools.TestRunner.Api;
using UnityEditor.TestTools.TestRunner.Api.Analytics;
<<<<<<<< HEAD:Spring 23-24, Game Dev/testing/Library/PackageCache/com.unity.test-framework@1.1.33/UnityEditor.TestRunner/TestRunner/Utils/CachingTestListProvider.cs
using UnityEngine.TestRunner.NUnitExtensions;
========
>>>>>>>> 0c056c51eea347ccf20c100943337fbb136daf12:Spring 23-24, Game Dev/Terrain2/Library/PackageCache/com.unity.test-framework@1.3.9/UnityEditor.TestRunner/TestRunner/Utils/CachingTestListProvider.cs
using UnityEngine.TestTools;

namespace UnityEditor.TestTools.TestRunner
{
    internal class CachingTestListProvider
    {
        private readonly ITestListProvider m_InnerTestListProvider;
        private readonly ITestListCache m_TestListCache;
        private readonly ITestAdaptorFactory m_TestAdaptorFactory;
        public CachingTestListProvider(ITestListProvider innerTestListProvider, ITestListCache testListCache, ITestAdaptorFactory testAdaptorFactory)
        {
            m_InnerTestListProvider = innerTestListProvider;
            m_TestListCache = testListCache;
            m_TestAdaptorFactory = testAdaptorFactory;
        }

        public IEnumerator<ITestAdaptor> GetTestListAsync(TestPlatform platform)
        {
            var testFromCache = m_TestListCache.GetTestFromCacheAsync(platform);
            while (testFromCache.MoveNext())
            {
                yield return null;
            }


            if (testFromCache.Current != null)
            {
                yield return testFromCache.Current;
            }
            else
            {
                var test = m_InnerTestListProvider.GetTestListAsync(platform);
                while (test.MoveNext())
                {
                    yield return null;
                }
                
                m_TestListCache.CacheTest(platform, test.Current);
<<<<<<<< HEAD:Spring 23-24, Game Dev/testing/Library/PackageCache/com.unity.test-framework@1.1.33/UnityEditor.TestRunner/TestRunner/Utils/CachingTestListProvider.cs
                AnalyticsReporter.AnalyzeTestTreeAndReport(test.Current);
========
#if !UNITY_2023_2_OR_NEWER
                AnalyticsReporter.AnalyzeTestTreeAndReport(test.Current);
#endif
>>>>>>>> 0c056c51eea347ccf20c100943337fbb136daf12:Spring 23-24, Game Dev/Terrain2/Library/PackageCache/com.unity.test-framework@1.3.9/UnityEditor.TestRunner/TestRunner/Utils/CachingTestListProvider.cs
                yield return m_TestAdaptorFactory.Create(test.Current);
            }
        }
    }
}
