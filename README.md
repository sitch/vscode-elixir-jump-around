# elixir-jump-around

Elixir Jump Around is a very simple tool that enables one to quickly switch between a module file and that module's test file.

The file that is switched to will use a very simple set of rules. If the file is located in test and ends in _test.exs, then the module file will be loaded by replacing "test" with "lib" in the path, and changing the file extension. Otherwise, "lib" is replaced with "test" in the path, and ".ex" is replaced with "_test.exs"

The default keybinding is `alt+g alt+t`.

## Quirks

One known quirk is that the associated file is created on disk rather than remaining unsaved. This is due to the save path not working properly in testing.

## Inspiration

This extension is a VSCode adaptation of valo's elixir-jump-around for atom. https://github.com/valo/elixir-jump-around
