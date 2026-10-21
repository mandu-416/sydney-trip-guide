-- Create one trip and its access code. Pick your own long random code and share it
-- only with your travel companions; do not commit the real one.
insert into public.trips (name, code_hash)
values ('시드니 여행', extensions.crypt('SYD-CHANGE-ME', extensions.gen_salt('bf')));
