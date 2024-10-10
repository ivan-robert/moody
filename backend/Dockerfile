# syntax=docker/dockerfile:1

FROM python:3.11.3-slim as base

# Prevents Python from writing pyc files to disc
ENV PYTHONDONTWRITEBYTECODE 1
# Keeps Python from buffering stdout and stderr
ENV PYTHONUNBUFFERED 1

WORKDIR /app

# Install system dependencies including GDAL and g++
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    python3-gdal \
    gdal-bin \
    libgdal-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set GDAL environment variables
ENV GDAL_VERSION=3.4.1
ENV GDAL_DATA=/usr/share/gdal/${GDAL_VERSION}
ENV PROJ_LIB=/usr/share/proj

# Copy your requirements file into the container
COPY requirements.txt /app/

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# You're already running as root so no need to switch users

# Copy the source code into the container
COPY . .

# Expose the port the application listens on
EXPOSE 8000

# Command to run the application
CMD ["./manage.py", "runserver", "0.0.0.0:8000"]

