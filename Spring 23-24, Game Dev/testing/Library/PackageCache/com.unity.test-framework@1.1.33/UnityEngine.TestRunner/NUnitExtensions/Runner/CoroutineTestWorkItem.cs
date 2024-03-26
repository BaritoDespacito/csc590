using System;
using System.Collections;
using NUnit.Framework.Interfaces;
using NUnit.Framework.Internal;
using NUnit.Framework.Internal.Commands;
<<<<<<<< HEAD:Spring 23-24, Game Dev/testing/Library/PackageCache/com.unity.test-framework@1.1.33/UnityEngine.TestRunner/NUnitExtensions/Runner/CoroutineTestWorkItem.cs
using NUnit.Framework.Internal.Execution;
========
>>>>>>>> 0c056c51eea347ccf20c100943337fbb136daf12:Spring 23-24, Game Dev/Terrain2/Library/PackageCache/com.unity.test-framework@1.3.9/UnityEngine.TestRunner/NUnitExtensions/Runner/CoroutineTestWorkItem.cs
using UnityEngine.TestTools.TestRunner;
using UnityEngine.TestTools.Utils;

namespace UnityEngine.TestRunner.NUnitExtensions.Runner
{
    internal class CoroutineTestWorkItem : UnityWorkItem
    {
        private static MonoBehaviour m_MonoBehaviourCoroutineRunner;
        private TestCommand m_Command;

        public static MonoBehaviour monoBehaviourCoroutineRunner
        {
            get
            {
                if (m_MonoBehaviourCoroutineRunner == null)
                {
                    throw new NullReferenceException("MonoBehaviour coroutine runner not set");
                }
                return m_MonoBehaviourCoroutineRunner;
            }
            set { m_MonoBehaviourCoroutineRunner = value; }
        }

        public CoroutineTestWorkItem(TestMethod test, ITestFilter filter)
            : base(test, null)
        {
            m_Command = m_Command = TestCommandBuilder.BuildTestCommand(test, filter);
        }

        protected override IEnumerable PerformWork()
        {
            if (m_Command is SkipCommand)
            {
                m_Command.Execute(Context);
                Result = Context.CurrentResult;
                WorkItemComplete();
                yield break;
            }

            var enumerableTestMethodCommand = (IEnumerableTestMethodCommand)m_Command;
            try
            {
                var executeEnumerable = enumerableTestMethodCommand.ExecuteEnumerable(Context).GetEnumerator();

                var coroutineRunner = new CoroutineRunner(monoBehaviourCoroutineRunner, Context);
                yield return coroutineRunner.HandleEnumerableTest(executeEnumerable);

<<<<<<<< HEAD:Spring 23-24, Game Dev/testing/Library/PackageCache/com.unity.test-framework@1.1.33/UnityEngine.TestRunner/NUnitExtensions/Runner/CoroutineTestWorkItem.cs
                if (coroutineRunner.HasFailedWithTimeout())
                {
                    Context.CurrentResult.SetResult(ResultState.Failure, new UnityTestTimeoutException(Context.TestCaseTimeout).Message);
                }

========
>>>>>>>> 0c056c51eea347ccf20c100943337fbb136daf12:Spring 23-24, Game Dev/Terrain2/Library/PackageCache/com.unity.test-framework@1.3.9/UnityEngine.TestRunner/NUnitExtensions/Runner/CoroutineTestWorkItem.cs
                while (executeEnumerable.MoveNext()) {}

                Result = Context.CurrentResult;
            }
            finally
            {
                WorkItemComplete();
            }
        }
    }
}
