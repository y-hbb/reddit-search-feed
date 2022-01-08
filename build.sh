cd app;
npm run build;
cp -R dist/** ../server/public;
cd ../server;
npm run build;