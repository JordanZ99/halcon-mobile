import { useState } from "react";

const ORANGE = "#F39C12";
const DARK = "#1A1A1A";
const GREY_BG = "#F2F2F2";
const GREY_CARD = "#FFFFFF";
const GREY_BORDER = "#D4D4D4";
const GREY_MUTED = "#6B6B6B";
const GREY_LABEL = "#3A3A3A";

export default function App() {
  const [notes, setNotes] = useState("Se dejó junto al portón");
  const [photoTaken, setPhotoTaken] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div
      style={{
        backgroundColor: GREY_BG,
        minHeight: "100dvh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      {/* Mobile shell */}
      <div
        style={{
          width: "100%",
          maxWidth: 390,
          minHeight: "100dvh",
          backgroundColor: GREY_BG,
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {/* Status bar spacer */}
        <div style={{ height: 44, backgroundColor: DARK, flexShrink: 0 }} />

        {/* ── Header ── */}
        <div
          style={{
            backgroundColor: DARK,
            padding: "12px 20px 16px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Back chevron */}
            <button
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                marginRight: 2,
              }}
            >
              <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
                <path
                  d="M8.5 1.5L1.5 8.5L8.5 15.5"
                  stroke="#FFFFFF"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div style={{ flex: 1 }}>
              <p
                style={{
                  color: "rgba(255,255,255,0.55)",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: 1.3,
                  textTransform: "uppercase",
                  fontFamily: "system-ui, sans-serif",
                  margin: 0,
                }}
              >
                Repartidor — Entrega
              </p>
              <h1
                style={{
                  color: "#FFFFFF",
                  fontSize: 22,
                  fontWeight: 800,
                  fontFamily: "system-ui, sans-serif",
                  margin: 0,
                  letterSpacing: 0.3,
                }}
              >
                Confirmar Entrega
              </h1>
            </div>

            {/* Invoice badge */}
            <div
              style={{
                backgroundColor: ORANGE,
                borderRadius: 8,
                padding: "6px 12px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  color: DARK,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 0.8,
                  textTransform: "uppercase",
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                Factura
              </span>
              <span
                style={{
                  color: DARK,
                  fontSize: 15,
                  fontWeight: 800,
                  fontFamily: "system-ui, sans-serif",
                  letterSpacing: 0.5,
                }}
              >
                #12345
              </span>
            </div>
          </div>
        </div>

        {/* ── Divider stripe ── */}
        <div style={{ height: 4, backgroundColor: ORANGE, flexShrink: 0 }} />

        {/* ── Scrollable body ── */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px 16px 140px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {/* ── Recipient info strip ── */}
          <div
            style={{
              backgroundColor: GREY_CARD,
              borderRadius: 12,
              padding: "14px 16px",
              display: "flex",
              gap: 16,
              border: `1px solid ${GREY_BORDER}`,
              boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
            }}
          >
            <InfoChip label="Destinatario" value="Carlos M." />
            <Divider />
            <InfoChip label="Zona" value="Sector Norte" />
            <Divider />
            <InfoChip label="Bultos" value="3 cajas" />
          </div>

          {/* ── Camera / photo section ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <SectionLabel text="Evidencia Fotográfica" required />

            {/* Camera tap area */}
            <button
              onClick={() => setPhotoTaken(!photoTaken)}
              style={{
                width: "100%",
                border: `2px dashed ${photoTaken ? ORANGE : GREY_BORDER}`,
                borderRadius: 14,
                backgroundColor: photoTaken ? "#FFF8EE" : GREY_CARD,
                cursor: "pointer",
                padding: 0,
                overflow: "hidden",
                position: "relative",
                transition: "all 0.2s",
              }}
            >
              {photoTaken ? (
                /* Simulated captured state */
                <div
                  style={{
                    height: 220,
                    backgroundColor: "#2A2A2A",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    position: "relative",
                  }}
                >
                  {/* Simulated photo frame lines */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(135deg, #3a3a3a 25%, #2a2a2a 25%, #2a2a2a 50%, #3a3a3a 50%, #3a3a3a 75%, #2a2a2a 75%)",
                      backgroundSize: "40px 40px",
                      opacity: 0.4,
                    }}
                  />
                  <div
                    style={{
                      position: "relative",
                      zIndex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    {/* Check circle */}
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        backgroundColor: ORANGE,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg width="26" height="20" viewBox="0 0 26 20" fill="none">
                        <path
                          d="M2 10L9 17L24 2"
                          stroke={DARK}
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span
                      style={{
                        color: "#FFFFFF",
                        fontSize: 14,
                        fontWeight: 700,
                        fontFamily: "system-ui, sans-serif",
                      }}
                    >
                      Foto capturada
                    </span>
                    <span
                      style={{
                        color: "rgba(255,255,255,0.55)",
                        fontSize: 12,
                        fontFamily: "system-ui, sans-serif",
                      }}
                    >
                      Toca para volver a tomar
                    </span>
                  </div>

                  {/* Corner markers (viewfinder style) */}
                  {[
                    { top: 12, left: 12 },
                    { top: 12, right: 12 },
                    { bottom: 12, left: 12 },
                    { bottom: 12, right: 12 },
                  ].map((pos, i) => (
                    <div
                      key={i}
                      style={{
                        position: "absolute",
                        width: 20,
                        height: 20,
                        borderColor: ORANGE,
                        borderStyle: "solid",
                        borderWidth: 0,
                        borderTopWidth: pos.top !== undefined ? 3 : 0,
                        borderBottomWidth: pos.bottom !== undefined ? 3 : 0,
                        borderLeftWidth: pos.left !== undefined ? 3 : 0,
                        borderRightWidth: pos.right !== undefined ? 3 : 0,
                        ...pos,
                      }}
                    />
                  ))}
                </div>
              ) : (
                /* Default state */
                <div
                  style={{
                    height: 220,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 14,
                    padding: "0 24px",
                  }}
                >
                  {/* Camera icon */}
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: "50%",
                      backgroundColor: "#F0F0F0",
                      border: `2px solid ${GREY_BORDER}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CameraIcon size={34} color={GREY_MUTED} />
                  </div>

                  <div style={{ textAlign: "center" }}>
                    <p
                      style={{
                        color: DARK,
                        fontSize: 16,
                        fontWeight: 700,
                        fontFamily: "system-ui, sans-serif",
                        margin: "0 0 4px",
                      }}
                    >
                      Tomar Foto de Evidencia
                    </p>
                    <p
                      style={{
                        color: GREY_MUTED,
                        fontSize: 13,
                        fontFamily: "system-ui, sans-serif",
                        margin: 0,
                        lineHeight: 1.4,
                      }}
                    >
                      Toca para abrir la camara y fotografiar la entrega
                    </p>
                  </div>

                  {/* CTA pill */}
                  <div
                    style={{
                      backgroundColor: DARK,
                      borderRadius: 24,
                      padding: "8px 22px",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <CameraIcon size={15} color="#FFFFFF" />
                    <span
                      style={{
                        color: "#FFFFFF",
                        fontSize: 13,
                        fontWeight: 700,
                        fontFamily: "system-ui, sans-serif",
                        letterSpacing: 0.3,
                      }}
                    >
                      Abrir Camara
                    </span>
                  </div>
                </div>
              )}
            </button>

            {/* Helper text */}
            <p
              style={{
                color: GREY_MUTED,
                fontSize: 12,
                fontFamily: "system-ui, sans-serif",
                margin: 0,
                paddingLeft: 4,
              }}
            >
              La foto debe mostrar claramente los materiales entregados y el punto de entrega.
            </p>
          </div>

          {/* ── Delivery notes ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <SectionLabel text="Notas de Entrega" />

            <div style={{ position: "relative" }}>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ej: Se dejó junto al portón principal..."
                rows={4}
                style={{
                  width: "100%",
                  borderRadius: 12,
                  border: `1.5px solid ${GREY_BORDER}`,
                  backgroundColor: GREY_CARD,
                  padding: "14px 16px",
                  fontSize: 15,
                  fontFamily: "system-ui, sans-serif",
                  color: GREY_LABEL,
                  resize: "none",
                  outline: "none",
                  boxSizing: "border-box",
                  lineHeight: 1.5,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = ORANGE;
                  e.currentTarget.style.boxShadow = `0 0 0 3px ${ORANGE}22`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = GREY_BORDER;
                  e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)";
                }}
              />
              <span
                style={{
                  position: "absolute",
                  bottom: 10,
                  right: 14,
                  color: GREY_MUTED,
                  fontSize: 11,
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                {notes.length}/200
              </span>
            </div>
          </div>

          {/* ── Quick note chips ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <p
              style={{
                color: GREY_MUTED,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: 0.8,
                textTransform: "uppercase",
                fontFamily: "system-ui, sans-serif",
                margin: 0,
              }}
            >
              Notas rapidas
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {[
                "Se dejó junto al portón",
                "Recibido por portero",
                "Firmado por cliente",
                "Dejado en recepción",
              ].map((note) => (
                <button
                  key={note}
                  onClick={() => setNotes(note)}
                  style={{
                    backgroundColor: notes === note ? `${ORANGE}18` : GREY_CARD,
                    border: `1.5px solid ${notes === note ? ORANGE : GREY_BORDER}`,
                    borderRadius: 20,
                    padding: "7px 14px",
                    cursor: "pointer",
                    color: notes === note ? DARK : GREY_MUTED,
                    fontSize: 13,
                    fontWeight: notes === note ? 700 : 400,
                    fontFamily: "system-ui, sans-serif",
                    transition: "all 0.15s",
                  }}
                >
                  {note}
                </button>
              ))}
            </div>
          </div>

          {/* ── Timestamp strip ── */}
          <div
            style={{
              backgroundColor: GREY_CARD,
              borderRadius: 12,
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: `1px solid ${GREY_BORDER}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <ClockIcon color={GREY_MUTED} />
              <div>
                <p
                  style={{
                    color: GREY_MUTED,
                    fontSize: 11,
                    fontFamily: "system-ui, sans-serif",
                    margin: 0,
                  }}
                >
                  Hora de registro
                </p>
                <p
                  style={{
                    color: DARK,
                    fontSize: 14,
                    fontWeight: 700,
                    fontFamily: "system-ui, sans-serif",
                    margin: 0,
                  }}
                >
                  26/04/2026 — 09:43 AM
                </p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "#27AE60",
                }}
              />
              <span
                style={{
                  color: "#27AE60",
                  fontSize: 12,
                  fontWeight: 700,
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                GPS activo
              </span>
            </div>
          </div>
        </div>

        {/* ── Fixed bottom action area ── */}
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            maxWidth: 390,
            backgroundColor: GREY_BG,
            borderTop: `1px solid ${GREY_BORDER}`,
            padding: "14px 16px 32px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            boxShadow: "0 -4px 20px rgba(0,0,0,0.10)",
          }}
        >
          {/* Validation hint */}
          {!photoTaken && (
            <div
              style={{
                backgroundColor: "#FFF3CD",
                border: "1px solid #F39C1240",
                borderRadius: 8,
                padding: "8px 14px",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 1L15 14H1L8 1Z"
                  stroke={ORANGE}
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path d="M8 6V9" stroke={ORANGE} strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="8" cy="11.5" r="0.75" fill={ORANGE} />
              </svg>
              <span
                style={{
                  color: "#7D4A00",
                  fontSize: 12,
                  fontFamily: "system-ui, sans-serif",
                  fontWeight: 500,
                }}
              >
                Se requiere foto de evidencia para continuar
              </span>
            </div>
          )}

          <button
            onClick={() => photoTaken && setSubmitted(!submitted)}
            style={{
              width: "100%",
              height: 56,
              borderRadius: 14,
              border: "none",
              backgroundColor: photoTaken ? ORANGE : "#D4D4D4",
              cursor: photoTaken ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              transition: "background-color 0.2s",
              boxShadow: photoTaken ? `0 4px 16px ${ORANGE}55` : "none",
            }}
          >
            {submitted ? (
              <>
                <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                  <path
                    d="M1 8L7 14L19 1"
                    stroke={DARK}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  style={{
                    color: DARK,
                    fontSize: 16,
                    fontWeight: 800,
                    fontFamily: "system-ui, sans-serif",
                    letterSpacing: 0.3,
                  }}
                >
                  Entrega Registrada
                </span>
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="7.5" stroke={photoTaken ? DARK : "#9A9A9A"} strokeWidth="1.5" />
                  <path
                    d="M5 9L7.5 11.5L13 6"
                    stroke={photoTaken ? DARK : "#9A9A9A"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  style={{
                    color: photoTaken ? DARK : "#9A9A9A",
                    fontSize: 16,
                    fontWeight: 800,
                    fontFamily: "system-ui, sans-serif",
                    letterSpacing: 0.3,
                  }}
                >
                  Finalizar y Registrar Entrega
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Sub-components ── */

function SectionLabel({ text, required }: { text: string; required?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span
        style={{
          color: GREY_LABEL,
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: 0.5,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {text}
      </span>
      {required && (
        <span
          style={{
            color: ORANGE,
            fontSize: 13,
            fontWeight: 800,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          *
        </span>
      )}
    </div>
  );
}

function InfoChip({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
      <span
        style={{
          color: GREY_MUTED,
          fontSize: 10,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: 0.8,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {label}
      </span>
      <span
        style={{
          color: DARK,
          fontSize: 13,
          fontWeight: 700,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {value}
      </span>
    </div>
  );
}

function Divider() {
  return (
    <div
      style={{
        width: 1,
        alignSelf: "stretch",
        backgroundColor: GREY_BORDER,
        flexShrink: 0,
      }}
    />
  );
}

function CameraIcon({ size = 24, color = "#1A1A1A" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path
        d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="13" r="4" stroke={color} strokeWidth="1.8" />
    </svg>
  );
}

function ClockIcon({ color = "#1A1A1A" }: { color?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.8" />
      <path d="M12 6V12L16 14" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
