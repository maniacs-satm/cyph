# Libsodium.js wrapper - API usage

Once you've included libsodium.js and libsodium-wrapper.js, all the available wrapped functions and constants can be accessed in the `sodium` object.

To learn about the role of each method, please refer to the original [documentation](http://doc.libsodium.org) of libsodium

List of existing types:
* `Buf`: An Uint8Array of a determined size. Used for keys, nonces, etc...
* `Unsized Buf`: An Uint8Array of an arbitrary size. Used for messages to sign, encrypt, hash, etc...
* `Optional unsized buf`
* `Unsigned Integer`
* `Generichash state address`
* `OneTimeAuth state address`
* `Randombytes implementation`
* `String`
* outputFormat: A string indicating in which output format you want the result to be returned. Supported values are "uint8array", "text", "hex", "base64". Optional parameter. Not available on all functions. Defaults to uint8array.

Please note that a function that returns more than one variable will in fact return an object, which will contain the outputs in question and whose attributes will be named after the outputs' names

Please also note that these are the function available "in general" in the wrapper. The actual number of availble functions in given build may be inferior to that, depending on what functions you choose to build to JS.

In addition to the main functions listed below, the library comes with a short list of helper methods. And here they are:
* `uint8array_to_String(buf)`: converts an Uint8Array into a UTF8 standard string
* `from_string(string)`: converts a standard string into a Uint8Array
* `to_hex(buf)`: returns the hexadecimal representation of the provided buf
* `from_hex(string)`: converts the provided hex-string into a Uint8Array and returns it
* `to_base64(buf)`: returns the base64 representation of the provided buf
* `from_base64(string)`: tries to convert the supposedly base64 string into a Uint8Array
* `available_encodings()`: returns a list of the available encodings
* `set_encoding(encodingName)`: reset the default result encoding to the encoding named `encodingName`
* `get_encoding()`: get the name of the encoding currently set as default
* `symbols()`: returns a list of the currently methods and constants
* `raw`: attribute referencing the raw emscripten-built libsodium library that we are wrapping
## crypto_aead_chacha20poly1305_decrypt
Function

__Parameters:__
* `secret_nonce`: Optional unsized buf
* `ciphertext`: Unsized buf
* `additional_data`: Optional unsized buf
* `public_nonce`: Buf (size: libsodium._crypto_aead_chacha20poly1305_npubbytes())
* `key`: Buf (size: libsodium._crypto_aead_chacha20poly1305_keybytes())

__Outputs:__
* `message`: Buf (size: ciphertext_length - libsodium._crypto_aead_chacha20poly1305_abytes())


## crypto_aead_chacha20poly1305_decrypt_detached
Function

__Parameters:__
* `secret_nonce`: Optional unsized buf
* `ciphertext`: Unsized buf
* `mac`: Buf (size: libsodium._crypto_box_macbytes())
* `additional_data`: Optional unsized buf
* `public_nonce`: Buf (size: libsodium._crypto_aead_chacha20poly1305_npubbytes())
* `key`: Buf (size: libsodium._crypto_aead_chacha20poly1305_keybytes())

__Outputs:__
* `message`: Buf (size: ciphertext_length)


## crypto_aead_chacha20poly1305_encrypt
Function

__Parameters:__
* `message`: Unsized buf
* `additional_data`: Optional unsized buf
* `secret_nonce`: Optional unsized buf
* `public_nonce`: Buf (size: libsodium._crypto_aead_chacha20poly1305_npubbytes())
* `key`: Buf (size: libsodium._crypto_aead_chacha20poly1305_keybytes())

__Outputs:__
* `ciphertext`: Buf (size: message_length + libsodium._crypto_aead_chacha20poly1305_abytes())


## crypto_aead_chacha20poly1305_encrypt_detached
Function

__Parameters:__
* `message`: Unsized buf
* `additional_data`: Optional unsized buf
* `secret_nonce`: Optional unsized buf
* `public_nonce`: Buf (size: libsodium._crypto_aead_chacha20poly1305_npubbytes())
* `key`: Buf (size: libsodium._crypto_aead_chacha20poly1305_keybytes())

__Outputs:__
* `ciphertext`: Buf (size: message_length)
* `mac`: Buf (size: libsodium._crypto_aead_chacha20poly1305_abytes())


## crypto_aead_chacha20poly1305_ietf_decrypt
Function

__Parameters:__
* `secret_nonce`: Optional unsized buf
* `ciphertext`: Unsized buf
* `additional_data`: Optional unsized buf
* `public_nonce`: Buf (size: libsodium._crypto_aead_chacha20poly1305_ietf_npubbytes())
* `key`: Buf (size: libsodium._crypto_aead_chacha20poly1305_ietf_keybytes())

__Outputs:__
* `message`: Buf (size: ciphertext_length - libsodium._crypto_aead_chacha20poly1305_ietf_abytes())


## crypto_aead_chacha20poly1305_ietf_decrypt_detached
Function

__Parameters:__
* `secret_nonce`: Optional unsized buf
* `ciphertext`: Unsized buf
* `mac`: Buf (size: libsodium._crypto_box_macbytes())
* `additional_data`: Optional unsized buf
* `public_nonce`: Buf (size: libsodium._crypto_aead_chacha20poly1305_ietf_npubbytes())
* `key`: Buf (size: libsodium._crypto_aead_chacha20poly1305_ietf_keybytes())

__Outputs:__
* `message`: Buf (size: ciphertext_length)


## crypto_aead_chacha20poly1305_ietf_encrypt
Function

__Parameters:__
* `message`: Unsized buf
* `additional_data`: Optional unsized buf
* `secret_nonce`: Optional unsized buf
* `public_nonce`: Buf (size: libsodium._crypto_aead_chacha20poly1305_ietf_npubbytes())
* `key`: Buf (size: libsodium._crypto_aead_chacha20poly1305_ietf_keybytes())

__Outputs:__
* `ciphertext`: Buf (size: message_length + libsodium._crypto_aead_chacha20poly1305_ietf_abytes())


## crypto_aead_chacha20poly1305_ietf_encrypt_detached
Function

__Parameters:__
* `message`: Unsized buf
* `additional_data`: Optional unsized buf
* `secret_nonce`: Optional unsized buf
* `public_nonce`: Buf (size: libsodium._crypto_aead_chacha20poly1305_ietf_npubbytes())
* `key`: Buf (size: libsodium._crypto_aead_chacha20poly1305_ietf_keybytes())

__Outputs:__
* `ciphertext`: Buf (size: message_length)
* `mac`: Buf (size: libsodium._crypto_aead_chacha20poly1305_ietf_abytes())


## crypto_auth
Function

__Parameters:__
* `message`: Unsized buf
* `key`: Buf (size: libsodium._crypto_auth_keybytes())

__Outputs:__
* `tag`: Buf (size: libsodium._crypto_auth_bytes())


## crypto_auth_hmacsha256
Function

__Parameters:__
* `message`: Unsized buf
* `key`: Buf (size: libsodium._crypto_auth_hmacsha256_keybytes())

__Outputs:__
* `hash`: Buf (size: libsodium._crypto_auth_hmacsha256_bytes())


## crypto_auth_hmacsha256_verify
Function

__Parameters:__
* `tag`: Buf (size: libsodium._crypto_auth_hmacsha256_bytes())
* `message`: Unsized buf
* `key`: Buf (size: libsodium._crypto_auth_hmacsha256_keybytes())

__Outputs:__
Boolean. True if method executed with success; false otherwise


## crypto_auth_hmacsha512
Function

__Parameters:__
* `message`: Unsized buf
* `key`: Buf (size: libsodium._crypto_auth_hmacsha512_keybytes())

__Outputs:__
* `hash`: Buf (size: libsodium._crypto_auth_hmacsha512_bytes())


## crypto_auth_hmacsha512_verify
Function

__Parameters:__
* `tag`: Buf (size: libsodium._crypto_auth_hmacsha512_bytes())
* `message`: Unsized buf
* `key`: Buf (size: libsodium._crypto_auth_hmacsha512_keybytes())

__Outputs:__
Boolean. True if method executed with success; false otherwise


## crypto_auth_verify
Function

__Parameters:__
* `tag`: Buf (size: libsodium._crypto_auth_bytes())
* `message`: Unsized buf
* `key`: Buf (size: libsodium._crypto_auth_keybytes())

__Outputs:__
Boolean. True if method executed with success; false otherwise


## crypto_box_beforenm
Function

__Parameters:__
* `publicKey`: Buf (size: libsodium._crypto_box_publickeybytes())
* `secretKey`: Buf (size: libsodium._crypto_box_secretkeybytes())

__Outputs:__
* `sharedKey`: Buf (size: libsodium._crypto_box_beforenmbytes())


## crypto_box_detached
Function

__Parameters:__
* `message`: Unsized buf
* `nonce`: Buf (size: libsodium._crypto_box_noncebytes())
* `publicKey`: Buf (size: libsodium._crypto_box_publickeybytes())
* `secretKey`: Buf (size: libsodium._crypto_box_secretkeybytes())

__Outputs:__
* `ciphertext`: Buf (size: message_length)
* `mac`: Buf (size: libsodium._crypto_box_macbytes())


## crypto_box_easy
Function

__Parameters:__
* `message`: Unsized buf
* `nonce`: Buf (size: libsodium._crypto_box_noncebytes())
* `publicKey`: Buf (size: libsodium._crypto_box_publickeybytes())
* `secretKey`: Buf (size: libsodium._crypto_box_secretkeybytes())

__Outputs:__
* `ciphertext`: Buf (size: message_length + libsodium._crypto_box_macbytes())


## crypto_box_easy_afternm
Function

__Parameters:__
* `message`: Unsized buf
* `nonce`: Buf (size: libsodium._crypto_box_noncebytes())
* `sharedKey`: Buf (size: libsodium._crypto_box_beforenmbytes())

__Outputs:__
* `ciphertext`: Buf (size: message_length + libsodium._crypto_box_macbytes())


## crypto_box_keypair
Function

__Parameters:__

__Outputs:__
* `publicKey`: Buf (size: libsodium._crypto_box_publickeybytes())
* `secretKey`: Buf (size: libsodium._crypto_box_secretkeybytes())


## crypto_box_open_detached
Function

__Parameters:__
* `ciphertext`: Unsized buf
* `mac`: Buf (size: libsodium._crypto_box_macbytes())
* `nonce`: Buf (size: libsodium._crypto_box_noncebytes())
* `publicKey`: Buf (size: libsodium._crypto_box_publickeybytes())
* `secretKey`: Buf (size: libsodium._crypto_box_secretkeybytes())

__Outputs:__
* `plaintext`: Buf (size: ciphertext_length)


## crypto_box_open_easy
Function

__Parameters:__
* `ciphertext`: Unsized buf
* `nonce`: Buf (size: libsodium._crypto_box_noncebytes())
* `publicKey`: Buf (size: libsodium._crypto_box_publickeybytes())
* `secretKey`: Buf (size: libsodium._crypto_box_secretkeybytes())

__Outputs:__
* `plaintext`: Buf (size: ciphertext_length - libsodium._crypto_box_macbytes())


## crypto_box_open_easy_afternm
Function

__Parameters:__
* `ciphertext`: Unsized buf
* `nonce`: Buf (size: libsodium._crypto_box_noncebytes())
* `sharedKey`: Buf (size: libsodium._crypto_box_beforenmbytes())

__Outputs:__
* `plaintext`: Buf (size: ciphertext_length - libsodium._crypto_box_macbytes())


## crypto_box_seal
Function

__Parameters:__
* `message`: Unsized buf
* `publicKey`: Buf (size: libsodium._crypto_box_publickeybytes())

__Outputs:__
* `ciphertext`: Buf (size: message_length + libsodium._crypto_box_sealbytes())


## crypto_box_seal_open
Function

__Parameters:__
* `ciphertext`: Unsized buf
* `publicKey`: Buf (size: libsodium._crypto_box_publickeybytes())
* `secretKey`: Buf (size: libsodium._crypto_box_secretkeybytes())

__Outputs:__
* `plaintext`: Buf (size: ciphertext_length - libsodium._crypto_box_sealbytes())


## crypto_box_seed_keypair
Function

__Parameters:__
* `seed`: Buf (size: libsodium._crypto_box_seedbytes())

__Outputs:__
* `publicKey`: Buf (size: libsodium._crypto_box_publickeybytes())
* `privateKey`: Buf (size: libsodium._crypto_box_secretkeybytes())


## crypto_generichash
Function

__Parameters:__
* `hash_length`: Unsigned Integer
* `message`: Unsized buf
* `key`: Optional unsized buf

__Outputs:__
* `hash`: Buf (size: hash_length)


## crypto_generichash_final
Function

__Parameters:__
* `state_address`: Generichash state address
* `hash_length`: Unsigned Integer

__Outputs:__
* `hash`: Buf (size: hash_length)


## crypto_generichash_init
Function

__Parameters:__
* `key`: Optional unsized buf
* `hash_length`: Unsigned Integer

__Outputs:__
* `state`: Generichash state


## crypto_generichash_update
Function

__Parameters:__
* `state_address`: Generichash state address
* `message_chunk`: Unsized buf

__Outputs:__
Boolean. True if method executed with success; false otherwise


## crypto_hash
Function

__Parameters:__
* `message`: Unsized buf

__Outputs:__
* `hash`: Buf (size: libsodium._crypto_hash_bytes())


## crypto_hash_sha256
Function

__Parameters:__
* `message`: Unsized buf

__Outputs:__
* `hash`: Buf (size: libsodium._crypto_hash_sha256_bytes())


## crypto_hash_sha512
Function

__Parameters:__
* `message`: Unsized buf

__Outputs:__
* `hash`: Buf (size: libsodium._crypto_hash_sha512_bytes())


## crypto_onetimeauth
Function

__Parameters:__
* `message`: Unsized buf
* `key`: Buf (size: libsodium._crypto_onetimeauth_keybytes())

__Outputs:__
* `hash`: Buf (size: libsodium._crypto_onetimeauth_bytes())


## crypto_onetimeauth_final
Function

__Parameters:__
* `state_address`: OneTimeAuth state address

__Outputs:__
* `hash`: Buf (size: libsodium._crypto_onetimeauth_bytes())


## crypto_onetimeauth_init
Function

__Parameters:__
* `key`: Optional unsized buf

__Outputs:__
* `state`: OneTimeAuth state


## crypto_onetimeauth_update
Function

__Parameters:__
* `state_address`: OneTimeAuth state address
* `message_chunk`: Unsized buf

__Outputs:__
Boolean. True if method executed with success; false otherwise


## crypto_onetimeauth_verify
Function

__Parameters:__
* `hash`: Buf (size: libsodium._crypto_onetimeauth_bytes())
* `message`: Unsized buf
* `key`: Buf (size: libsodium._crypto_onetimeauth_keybytes())

__Outputs:__
Boolean. True if method executed with success; false otherwise


## crypto_pwhash
Function

__Parameters:__
* `keyLength`: Unsigned Integer
* `password`: Unsized buf
* `salt`: Buf (size: libsodium._crypto_pwhash_saltbytes())
* `opsLimit`: Unsigned Integer
* `memLimit`: Unsigned Integer
* `algorithm`: Unsigned Integer

__Outputs:__
* `derivedKey`: Buf (size: keyLength)


## crypto_pwhash_scryptsalsa208sha256
Function

__Parameters:__
* `keyLength`: Unsigned Integer
* `password`: Unsized buf
* `salt`: Buf (size: libsodium._crypto_pwhash_scryptsalsa208sha256_saltbytes())
* `opsLimit`: Unsigned Integer
* `memLimit`: Unsigned Integer

__Outputs:__
* `derivedKey`: Buf (size: keyLength)


## crypto_pwhash_scryptsalsa208sha256_ll
Function

__Parameters:__
* `password`: Unsized buf
* `salt`: Unsized buf
* `opsLimit`: Unsigned Integer
* `r`: Unsigned Integer
* `p`: Unsigned Integer
* `keyLength`: Unsigned Integer

__Outputs:__
* `derivedKey`: Buf (size: keyLength)


## crypto_pwhash_scryptsalsa208sha256_str
Function

__Parameters:__
* `password`: Unsized buf
* `opsLimit`: Unsigned Integer
* `memLimit`: Unsigned Integer

__Outputs:__
* `hashed_password`: Buf (size: libsodium._crypto_pwhash_scryptsalsa208sha256_strbytes())


## crypto_pwhash_scryptsalsa208sha256_str_verify
Function

__Parameters:__
* `hashed_password`: A string
* `password`: Unsized buf

__Outputs:__
Boolean. True if method executed with success; false otherwise


## crypto_pwhash_str
Function

__Parameters:__
* `password`: Unsized buf
* `opsLimit`: Unsigned Integer
* `memLimit`: Unsigned Integer

__Outputs:__
* `hashed_password`: Buf (size: libsodium._crypto_pwhash_strbytes())


## crypto_pwhash_str_verify
Function

__Parameters:__
* `hashed_password`: A string
* `password`: Unsized buf

__Outputs:__
Boolean. True if method executed with success; false otherwise


## crypto_scalarmult
Function

__Parameters:__
* `privateKey`: Buf (size: libsodium._crypto_scalarmult_scalarbytes())
* `publicKey`: Buf (size: libsodium._crypto_scalarmult_scalarbytes())

__Outputs:__
* `sharedSecret`: Buf (size: libsodium._crypto_scalarmult_bytes())


## crypto_scalarmult_base
Function

__Parameters:__
* `privateKey`: Buf (size: libsodium._crypto_scalarmult_scalarbytes())

__Outputs:__
* `publicKey`: Buf (size: libsodium._crypto_scalarmult_scalarbytes())


## crypto_secretbox_detached
Function

__Parameters:__
* `message`: Unsized buf
* `nonce`: Buf (size: libsodium._crypto_secretbox_noncebytes())
* `key`: Buf (size: libsodium._crypto_secretbox_keybytes())

__Outputs:__
* `cipher`: Buf (size: message_length)
* `mac`: Buf (size: libsodium._crypto_secretbox_macbytes())


## crypto_secretbox_easy
Function

__Parameters:__
* `message`: Unsized buf
* `nonce`: Buf (size: libsodium._crypto_secretbox_noncebytes())
* `key`: Buf (size: libsodium._crypto_secretbox_keybytes())

__Outputs:__
* `cipher`: Buf (size: message_length + libsodium._crypto_secretbox_macbytes())


## crypto_secretbox_open_detached
Function

__Parameters:__
* `ciphertext`: Unsized buf
* `mac`: Buf (size: libsodium._crypto_secretbox_macbytes())
* `nonce`: Buf (size: libsodium._crypto_secretbox_noncebytes())
* `key`: Buf (size: libsodium._crypto_secretbox_keybytes())

__Outputs:__
* `message`: Buf (size: ciphertext_length)


## crypto_secretbox_open_easy
Function

__Parameters:__
* `ciphertext`: Unsized buf
* `nonce`: Buf (size: libsodium._crypto_secretbox_noncebytes())
* `key`: Buf (size: libsodium._crypto_secretbox_keybytes())

__Outputs:__
* `message`: Buf (size: ciphertext_length - libsodium._crypto_secretbox_macbytes())


## crypto_shorthash
Function

__Parameters:__
* `message`: Unsized buf
* `key`: Buf (size: libsodium._crypto_shorthash_keybytes())

__Outputs:__
* `hash`: Buf (size: libsodium._crypto_shorthash_bytes())


## crypto_sign
Function

__Parameters:__
* `message`: Unsized buf
* `privateKey`: Buf (size: libsodium._crypto_sign_secretkeybytes())

__Outputs:__
* `signature`: Buf (size: message.length + libsodium._crypto_sign_bytes())


## crypto_sign_detached
Function

__Parameters:__
* `message`: Unsized buf
* `privateKey`: Buf (size: libsodium._crypto_sign_secretkeybytes())

__Outputs:__
* `signature`: Buf (size: libsodium._crypto_sign_bytes())


## crypto_sign_ed25519_pk_to_curve25519
Function

__Parameters:__
* `edPk`: Buf (size: libsodium._crypto_sign_publickeybytes())

__Outputs:__
* `cPk`: Buf (size: libsodium._crypto_scalarmult_scalarbytes())


## crypto_sign_ed25519_sk_to_curve25519
Function

__Parameters:__
* `edSk`: Buf (size: libsodium._crypto_sign_secretkeybytes())

__Outputs:__
* `cSk`: Buf (size: libsodium._crypto_scalarmult_scalarbytes())


## crypto_sign_ed25519_sk_to_pk
Function

__Parameters:__
* `privateKey`: Buf (size: libsodium._crypto_sign_secretkeybytes())

__Outputs:__
* `publicKey`: Buf (size: libsodium._crypto_sign_publickeybytes())


## crypto_sign_ed25519_sk_to_seed
Function

__Parameters:__
* `privateKey`: Buf (size: libsodium._crypto_sign_secretkeybytes())

__Outputs:__
* `seed`: Buf (size: libsodium._crypto_sign_seedbytes())


## crypto_sign_keypair
Function

__Parameters:__

__Outputs:__
* `publicKey`: Buf (size: libsodium._crypto_sign_publickeybytes())
* `privateKey`: Buf (size: libsodium._crypto_sign_secretkeybytes())


## crypto_sign_open
Function

__Parameters:__
* `signedMessage`: Unsized buf
* `publicKey`: Buf (size: libsodium._crypto_sign_publickeybytes())

__Outputs:__
* `message`: Buf (size: signedMessage_length - libsodium._crypto_sign_bytes())


## crypto_sign_seed_keypair
Function

__Parameters:__
* `seed`: Buf (size: libsodium._crypto_sign_seedbytes())

__Outputs:__
* `publicKey`: Buf (size: libsodium._crypto_sign_publickeybytes())
* `privateKey`: Buf (size: libsodium._crypto_sign_secretkeybytes())


## crypto_sign_verify_detached
Function

__Parameters:__
* `signature`: Buf (size: libsodium._crypto_sign_bytes())
* `message`: Unsized buf
* `publicKey`: Buf (size: libsodium._crypto_sign_publickeybytes())

__Outputs:__
Boolean. True if method executed with success; false otherwise


## crypto_stream_chacha20
Function

__Parameters:__
* `outLength`: Unsigned Integer
* `key`: Buf (size: libsodium._crypto_stream_chacha20_keybytes())
* `nonce`: Buf (size: libsodium._crypto_stream_chacha20_noncebytes())

__Outputs:__
* `out`: Buf (size: outLength)


## randombytes_buf
Function

__Parameters:__
* `length`: Unsigned Integer

__Outputs:__
* `output`: Buf (size: length)


## randombytes_close
Function

__Parameters:__

__Outputs:__
Boolean. True if method executed with success; false otherwise


## randombytes_random
Function

__Parameters:__

__Outputs:__
Boolean. True if method executed with success; false otherwise


## randombytes_set_implementation
Function

__Parameters:__
* `implementation`: Randombytes implementation

__Outputs:__
Boolean. True if method executed with success; false otherwise


## randombytes_stir
Function

__Parameters:__

__Outputs:__
Boolean. True if method executed with success; false otherwise


## randombytes_uniform
Function

__Parameters:__
* `upper_bound`: Unsigned Integer

__Outputs:__
Boolean. True if method executed with success; false otherwise


## sodium_version_string
Function

__Parameters:__

__Outputs:__
Boolean. True if method executed with success; false otherwise


