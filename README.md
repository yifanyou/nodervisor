nodervisor
==========

Supervisor manager in node.js

### Requirements

- Node.js
- Supervisord
- NPM

### Installation

  1. Clone the git repository into a folder and run:

        npm install

  2. Update the config.js file with your database connection details.

### How to use it

  Run the app using:

    npm start

  2. After the app has started, navigate to the machine in a browser on port 3000.
  For instance:
    http://localhost:3000

  3. Log in using the default credentials of:
  	<ul>
  		<li>Email: admin@nodervisor</li>
  		<li>Password: admin</li>
	</ul>

  4. Navigate to the users page using the top menu. Change the admin credentials or add a new user and remove them.

  5. Navigate to the hosts page using the top menu. Then add a host running supervisord using the form. Your supervisord config on each host should be set up to allow the xmlrpc interface over a inet port.
  For instance:

    [inet_http_server]
    port = *:9009 ;

  At this point, navigating back to the home page should show you a list of your hosts, and the processes running on them.
