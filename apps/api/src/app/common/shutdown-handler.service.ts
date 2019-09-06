import { Injectable, Logger, LoggerService, OnApplicationShutdown } from "@nestjs/common";


// ====[ Possible signals send to the Node process ]=========================================================================================================================================
//
//  :
//
//     SIGHUP     The SIGHUP signal is sent to a process when its controlling terminal is closed. It was originally designed to notify the process of a serial line drop (a hangup).
//                In modern systems, this signal usually means that the controlling pseudo or virtual terminal has been closed.[4] Many daemons will reload their configuration files
//                and reopen their logfiles instead of exiting when receiving this signal.
//
//     SIGINT     The SIGINT signal is sent to a process by its controlling terminal when a user wishes to interrupt the process. This is typically initiated by pressing Ctrl+C.
//
//     SIGQUIT    The SIGQUIT signal is sent to a process by its controlling terminal when the user requests that the process quit and perform a core dump.
//
//     SIGKILL    The SIGKILL signal is sent to a process to cause it to terminate immediately (kill). In contrast to SIGTERM and SIGINT, this signal cannot be caught or ignored,
//                and the receiving process cannot perform any clean-up upon receiving this signal. The following exceptions apply:
//                    - Zombie processes cannot be killed since they are already dead and waiting for their parent processes to reap them.
//                    - Processes that are in the blocked state will not die until they wake up again.
//                    - The init process is special: It does not get signals that it does not want to handle, and thus it can ignore SIGKILL.[7] An exception from this exception is
//                      while init is ptraced on Linux.[8][9]
//                    - An uninterruptibly sleeping process may not terminate (and free its resources) even when sent SIGKILL. This is one of the few cases in which a UNIX system may
//                      have to be rebooted to solve a temporary software problem.
//                SIGKILL is used as a last resort when terminating processes in most system shutdown procedures if it does not voluntarily exit in response to SIGTERM.
//
//     SIGTRAP    The SIGTRAP signal is sent to a process when an exception (or trap) occurs: a condition that a debugger has requested to be informed of – for example, when a particular
//                function is executed, or when a particular variable changes value.
//
//     SIGABRT    The SIGABRT signal is sent to a process to tell it to abort, i.e. to terminate. The signal is usually initiated by the process itself when it calls abort() function of
//                the C Standard Library, but it can be sent to the process from outside like any other signal.
//
//     SIGBUS     The SIGBUS signal is sent to a process when it causes a bus error. The conditions that lead to the signal being sent are, for example, incorrect memory access alignment
//                or non-existent physical address.
//
//     SIGFPE     The SIGFPE signal is sent to a process when it executes an erroneous arithmetic operation, such as division by zero. This may include integer division by zero,
//                and integer overflow in the result of a divide (only INT_MIN/-1, INT64_MIN/-1 and %-1 accessible from C).
//
//     SIGSEGV    The SIGSEGV signal is sent to a process when it makes an invalid virtual memory reference, or segmentation fault, i.e. when it performs a segmentation violation.
//
//     SIGUSR2    The SIGUSR2 signals is sent to a process to indicate user-defined conditions.
//
//     SIGTERM    The SIGTERM signal is sent to a process to request its termination. Unlike the SIGKILL signal, it can be caught and interpreted or ignored by the process.
//                This allows the process to perform nice termination releasing resources and saving state if appropriate. SIGINT is nearly identical to SIGTERM.
//
// ==========================================================================================================================================================================================


@Injectable()
export class ShutdownHandlerService implements OnApplicationShutdown
{
    private readonly logger: Logger;

    constructor()
    {
        this.logger = new Logger(ShutdownHandlerService.name);
    }

    onApplicationShutdown(signal?: string): any
    {
        this.logger.error(`----------->  Received Signal: ${signal ? signal: '-nothing-'}`);
    }
}
