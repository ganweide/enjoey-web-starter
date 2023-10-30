from django.core.management.base import BaseCommand
from enjoey_api.management.commands.scheduler_manager import stop_scheduler

class Command(BaseCommand):
    help = "Stops the APScheduler."

    def handle(self, *args, **options):
        stop_scheduler()
        print("Scheduler stopped.")
