Haraka

Congratulations on creating a new installation of Haraka.

This directory contains two key directories for how Haraka will function:

 - config
           This directory contains configuration files for Haraka. The
           directory contains the default configuration. You probably want
           to modify some files in here, particularly `smtp.ini`.
 - plugins
           This directory contains custom plugins which you write to run in
           Haraka. The plugins which ship with Haraka are still available
           to use.
 - docs/plugins
           This directory contains documentation for your plugins.

Documentation for Haraka is available via `haraka -h <name> where the name
is either the name of a plugin (without the .js extension) or the name of
a core Haraka module, such as `Connection` or `Transaction`.

To get documentation on writing a plugin type `haraka -h Plugins`.

## Running the server

```
haraka -c .
```

Mail can be sent using the `swaks` command line tool: http://jetmore.org/john/code/swaks/

e.g.
```
 swaks -h domain.com -t 0x06e6f7D896696167B2dA9281EbAF8a14580fbFCc@myserver.com -f somewhere@example.com  -s localhost -p 25 
```

## Pearl plugins

### data.firebase

Saves a copy of messages in Firebase and also delivers push notifications through the pearl-mobile app.

Requires the `GOOGLE_APPLICATION_CREDENTIALS` env var when running the server:

```
GOOGLE_APPLICATION_CREDENTIALS=<path to json file> haraka -c .
```

### get_mx.eth

Resolves recipient addresses using Pearl smart contracts rather than DNS MX records.