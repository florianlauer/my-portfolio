{ pkgs, ... }:

{
  packages = with pkgs; [
    actionlint
    yamllint
    docker
    colima
  ];

  languages.javascript = {
    enable = true;
    package = pkgs.nodejs_22;
    # pnpm shim, version pinned by package.json#packageManager
    corepack.enable = true;
  };
}
