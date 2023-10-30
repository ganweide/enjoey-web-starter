from apscheduler.schedulers.blocking import BlockingScheduler
from .management.commands.runapscheduler import my_job

scheduler = None  # Singleton instance

def get_scheduler():
    global scheduler
    if scheduler is None:
        scheduler = BlockingScheduler()
        scheduler.add_job(my_job, trigger='interval', seconds=2)
    return scheduler
