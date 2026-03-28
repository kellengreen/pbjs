=======
strings
=======

root.set(value, "foo", "bar")
root.get("foo", "bar")
root.delete("foo", "bar")
root.listen(cb, "foo", "bar")
root.ignore(cb, "foo", "bar")

[+] easy to implement
[+] string paths improve flexablity
[+] no need for symbols
[+] allows for wildcards
[-] doesn't work with array methods
[-] more complex proxy lookup

=======
symbols
=======

root.foo.bar = value
root.foo.bar
delete root.foo.bar
root.foo[listen]("foo", cb)
root.foo[ignore]("foo", cb)

[+] works with array methods
[-] somewhat confusing syntax, better?

========
symbols+
========

root.foo.bar = value
root.foo.bar
delete root.foo.bar
root.foo.bar[listen](cb)
root.foo.bar[ignore](cb)

[+] works with array methods
[+] improved syntax
[-] no wildcard support
[-] extending primitives
[-] is referencing the parent object possible?
