# from django_apscheduler.jobstores import DjangoJobStore
# from apscheduler.schedulers.background import BackgroundScheduler

# scheduler = BackgroundScheduler()
# scheduler.add_jobstore(DjangoJobStore(), "default")

def my_job():
    # Your job logic here
    print("Hello World")

def my_job2():
    print("Hello World 2")

# def my_job2():
#     # Your job logic here
#     print("Hello World 2")

# def my_job3():
#     # Your job logic here
#     print("Hello World 3")

# scheduler.add_job(
#     my_job,
#     trigger="interval",
#     seconds=10,  # Every 10 seconds
#     id="my_job",
#     replace_existing=True,
# )

# scheduler.add_job(
#     delete_old_job_executions,
#     trigger="cron",
#     day_of_week="thu",
#     hour="10",
#     minute="29",
#     id="delete_old_job_executions",
#     replace_existing=True,
# )