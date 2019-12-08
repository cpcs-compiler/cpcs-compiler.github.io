CpcSC is a front end for LLVM for a subset of CpcdosC+ language

# Usage example

helloworld.cpc
```batch
REM/ Display "Hello World" and exit

TXT/ Hello World
```

Compile it with:
```bash
$ cpcsc -o helloworld.o helloworld.cpc
$ ld -o helloworld helloworld.o -lcpcsc_runtime
$ ./helloworld
Hello World
```