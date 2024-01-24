# Use the official Python base image
FROM python:3.8-slim-buster

# Set the working directory in the container
WORKDIR /app

ENV PYTHONPATH "${PYTHONPATH}:/app"

# Copy the requirements file into the container
COPY requirements.txt .

# Install the required packages using pip
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire project directory into the container
COPY . .

# Copy the .env file into the container
COPY .env .env

# Set $PORT environment variable
ENV PORT 8080

# Expose port 8080 for the Flask app
EXPOSE 8080

# Set the environment variables from the .env file during runtime
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 main:app

