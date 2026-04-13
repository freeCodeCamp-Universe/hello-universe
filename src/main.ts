const info = document.getElementById("info");
if (info) {
  const deployTime = new Date().toISOString();
  info.innerHTML = `
    <dl>
      <dt>Build time</dt>
      <dd><time>${deployTime}</time></dd>
      <dt>User agent</dt>
      <dd id="ua"></dd>
    </dl>
  `;
  const ua = document.getElementById("ua");
  if (ua) ua.textContent = navigator.userAgent;
}
