npm run build -w app;

#copying built app to server/public
cp -R app/dist/** server/public;

npm run build -w server;