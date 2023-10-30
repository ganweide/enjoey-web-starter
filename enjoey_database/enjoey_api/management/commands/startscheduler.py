# startscheduler.py
from django.core.management.base import BaseCommand
from apscheduler.schedulers.background import BackgroundScheduler
from django_apscheduler.jobstores import DjangoJobStore
from enjoey_api.jobs import my_job, delete_old_job_executions  # Import the functions from jobs.py

# Global variable to store the scheduler instance
scheduler = None

class Command(BaseCommand):
    help = "Starts the APScheduler."

    def handle(self, *args, **options):
        global scheduler  # Use the global scheduler variable
        scheduler = BackgroundScheduler()
        scheduler.add_jobstore(DjangoJobStore(), "default")

        scheduler.add_job(
            my_job,
            trigger="interval",
            seconds=2,
            id="my_job",
            replace_existing=True,
        )

        scheduler.add_job(
            delete_old_job_executions,
            trigger="cron",
            day_of_week="mon",
            hour="10",
            minute="57",
            id="delete_old_job_executions",
            replace_existing=True,
        )

        scheduler.start()
