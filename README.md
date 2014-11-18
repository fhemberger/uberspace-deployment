# (Semi)automated deployment with Git and services on Uberspace

*Note: This script was created to run at the German hosting service [Uberspace](https://uberspace.de) using [Gitolite](https://github.com/sitaramc/gitolite) and [daemontools](http://cr.yp.to/daemontools.html). To run it on a different environment, it has to be adjusted slightly.*

## What does it do?

This script (a pimped Git "post-receive" hook) allows you to start an automated deployment of your application on each push to your Uberspace server.

It …

- stops any running instance of your app-service
- pulls a local copy of the current revision
- executes a customizable deployment script to update your dependencies
- logs the deployment to your service log
- and restarts the service

Pushing to different branches on the remote creates separate applications (with the master branch used for production), so you can easily set-up development and qa deployments for your application.


## Prerequisites 

- Configure Gitolite on your Uberspace account ([German how-to](https://wiki.uberspace.de/cool:gitolite))
- Create a new repository in your local Gitolite config (in `conf/gitolite.conf`) and push the update.
- Either pull the new Git repository to your machine:  
  `git clone ssh://<username>@<host>.uberspace.de/<yourrepo>.git`  
  or add it as a new remote to an existing repositroy:  
  `git remote add uberspace ssh://<username>@<host>.uberspace.de/<yourrepo>.git`


## Setup
Copy the contents of this repository to your remote host. There, 
- Copy `post-receive` to `yourrepo.git/hooks/post-receive`. The script makes a few assumptions that you can adjust to your liking:
    - The deployed applications will be in `~/apps`
    - The daemontools services will be in `~/service`
- Copy `dummy-service.js` to `~/service/dummy-service.js`

Now you can push for the first time to the new remote. If no service is found, the script will create a dummy service for you. Afterwards, you need to edit two files in the service directory:
- `deploy`: This script is executed on each subsequent deployment. You can define custom steps here like installing dependencies.
- `run`: This will be called each time the service is started

When you're done setting everything up, call `deploy` once to make your service ready for running, then `svc -du <yourservice>` to actually start the service. This needs only to be done manually on the first set-up, all follow up deployments will execute these steps automatically.


## License

[MIT](LICENSE)
