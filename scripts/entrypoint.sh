#!/bin/sh

echo "⏳ Aguardando MySQL..."

until nc -z mysql 3306; do
  sleep 2
done

echo "✅ MySQL disponível"

echo "🚀 Running migrations..."
node ace migration:run --force

echo "🌱 Running seeders..."
node ace db:seed --force

echo "🚀 Starting server..."
node ace serve --watch
