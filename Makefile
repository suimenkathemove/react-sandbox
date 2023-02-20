ifndef VERBOSE
.SILENT:
endif

.PHONY: wasm
wasm:
	cd ./wasm && cargo watch -s "wasm-pack build"
