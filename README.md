docker run -p 9000:9000 -p 9001:9001 -v "$(pwd)/tmp/minio_data:/data" minio/minio server/data --console-address ":9001"
