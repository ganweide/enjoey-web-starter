from apscheduler.schedulers.background import BackgroundScheduler
from django_apscheduler.jobstores import DjangoJobStore

# Global variable to store the scheduler instance
scheduler = None

def initialize_scheduler():
    global scheduler
    if scheduler is None:
        scheduler = BackgroundScheduler()
        scheduler.add_jobstore(DjangoJobStore(), "default")
        scheduler.start()
        return scheduler

def stop_scheduler():
    global scheduler
    if scheduler is not None:
        scheduler.shutdown()
        scheduler = None

def is_scheduler_running():
    return scheduler is not None