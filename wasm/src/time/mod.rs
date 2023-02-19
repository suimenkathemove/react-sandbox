use std::time::Duration;
use wasm_bindgen_futures::spawn_local;
use wasm_timer::Delay;

pub fn delay(f: Box<dyn Fn()>, mills: u64) {
    spawn_local(async move {
        Delay::new(Duration::from_millis(mills)).await.unwrap();

        f();
    });
}
