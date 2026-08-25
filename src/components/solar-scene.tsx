export function SolarScene() {
  return (
    <div className="solar-scene" aria-hidden="true">
      <div className="scene-rays" />
      <div className="scene-sun"><span /></div>
      <div className="scene-cloud cloud-one" />
      <div className="scene-cloud cloud-two" />
      <div className="scene-ground" />
      <div className="scene-house">
        <div className="house-roof"><div className="roof-panels"><i /><i /><i /><i /><i /><i /></div></div>
        <div className="house-wall"><span className="house-door" /><span className="house-window" /></div>
      </div>
      <div className="scene-business">
        <div className="business-panels"><i /><i /><i /><i /></div>
        <div className="business-body"><i /><i /><i /><i /><i /><i /></div>
      </div>
      <div className="energy-line energy-home"><span /></div>
      <div className="energy-line energy-business"><span /></div>
      <div className="scene-caption"><strong>Cebu-ready design</strong><span>Built around your actual site and energy needs</span></div>
    </div>
  );
}
