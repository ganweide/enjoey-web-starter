from django.core.management.base import BaseCommand
from enjoey_api.management.commands.scheduler_manager import initialize_scheduler

class Command(BaseCommand):
    help = "Starts the APScheduler."

    def handle(self, *args, **options):
        scheduler = initialize_scheduler()
        if scheduler is not None:
            print("Scheduler started.")
        else:
            print("Scheduler is already running.")
