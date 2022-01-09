npm run build -w app;

rm -rf server/public/*;

#copying built app to server/public
cp -R app/dist/** server/public;

npm run build -w server;