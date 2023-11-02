from apscheduler.schedulers.background import BackgroundScheduler
from django_apscheduler.jobstores import DjangoJobStore
from enjoey_api.jobs import my_job, my_job2

# Global variable to store the scheduler instance
scheduler_job1 = None
scheduler_job2 = None

def start_scheduler(job_name):
    global scheduler_job1, scheduler_job2
    if job_name not in ('job1', 'job2'):
        print("Invalid job name. Use 'job1' or 'job2'.")
        return None

    scheduler = scheduler_job1 if job_name == 'job1' else scheduler_job2

    if scheduler is not None:
        print(f"Scheduler for {job_name} is already running.")
        return scheduler  # Return the existing scheduler
    else:
        scheduler = BackgroundScheduler()
        scheduler.add_jobstore(DjangoJobStore(), "default")

        if job_name == 'job1':
            scheduler.add_job(
                my_job,
                trigger="interval",
                seconds=1,
                id="my_job1",
                replace_existing=True,
            )
        elif job_name == 'job2':
            scheduler.add_job(
                my_job2,
                trigger="interval",
                seconds=1,
                id="my_job2",
                replace_existing=True,
            )
        scheduler.start()
        if job_name == 'job1':
            scheduler_job1 = scheduler
        elif job_name == 'job2':
            scheduler_job2 = scheduler
        return scheduler
    
def stop_scheduler(job_name):
    global scheduler_job1, scheduler_job2
    if job_name not in ('job1', 'job2'):
        print("Invalid job name. Use 'job1' or 'job2'.")
        return None

    scheduler = scheduler_job1 if job_name == 'job1' else scheduler_job2
    print("scheduler", scheduler)
    if scheduler is not None:
        scheduler.shutdown()
        scheduler = None
        print(f"Scheduler for {job_name} stopped.")
    else:
        print(f"Scheduler for {job_name} is not running.")

    # Update the global scheduler variables
    if job_name == 'job1':
        scheduler_job1 = scheduler
    elif job_name == 'job2':
        scheduler_job2 = scheduler

# def my_job_scheduler():
#     global scheduler_job1
#     if scheduler_job1 is None:
#         scheduler_job1 = BackgroundScheduler()
#         scheduler_job1.add_jobstore(DjangoJobStore(), "default")
#         scheduler_job1.add_job(
#             my_job,
#             trigger="interval",
#             seconds=1,
#             id="my_job",
#             replace_existing=True,
#         )
#         scheduler_job1.start()
#         return scheduler_job1

# def stop_scheduler_job1():
#     global scheduler_job1
#     if scheduler_job1 is not None:
#         scheduler_job1.shutdown()
#         scheduler_job1 = None

def is_scheduler_running_job1():
    return scheduler_job1 is not None

# def my_job2_scheduler():
#     global scheduler_job2
#     if scheduler_job2 is None:
#         scheduler_job2 = BackgroundScheduler()
#         scheduler_job2.add_jobstore(DjangoJobStore(), "default")
#         scheduler_job2.add_job(
#             my_job,
#             trigger="interval",
#             seconds=1,
#             id="my_job",
#             replace_existing=True,
#         )
#         scheduler_job2.start()
#         return scheduler_job2

# def stop_scheduler_job2():
#     global scheduler_job2
#     if scheduler_job2 is not None:
#         scheduler_job2.shutdown()
#         scheduler_job2 = None

def is_scheduler_running_job2():
    return scheduler_job2 is not None