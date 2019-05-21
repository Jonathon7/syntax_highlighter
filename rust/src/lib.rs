extern crate regex;
extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn detect(string: &str) -> bool {
    match string {
        "function" => true,
        "let" => true,
        "const" => true,
        "var" => true,
        "this" => true,
        "in" => true,
        "for" => true,
        "class" => true,
        "return" => true,
        "await" => true,
        "break" => true,
        "case" => true,
        "try" => true,
        "catch" => true,
        "continue" => true,
        "debugger" => true,
        "default" => true,
        "delete" => true,
        "do" => true,
        "if" => true,
        "else" => true,
        "extends" => true,
        "false" => true,
        "true" => true,
        "new" => true,
        "null" => true,
        "static" => true,
        "super" => true,
        "switch" => true,
        "while" => true,
        "=" => true,
        ";" => true,
        &_ => false,
    }
}
