using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class PlayerMove : MonoBehaviour
{
    
    [SerializeField] TextMeshProUGUI _youDiedText;
    [SerializeField] private GameObject _crosshair;
    [SerializeField] private bool isDead;
    [SerializeField] TextMeshProUGUI _scoreText;
    
    [SerializeField] private float fadeTime = 3;
    [SerializeField] private float alphaValue;
    [SerializeField] private float fadeAwayPerSecond;
    
    // Start is called before the first frame update
    void Start()
    {
        _youDiedText.enabled = false;
        _crosshair.SetActive(true);
        isDead = false;

        fadeAwayPerSecond = 1 / fadeTime;
        fadeAwayPerSecond /= 20;
        alphaValue = _youDiedText.color.a;
    }
    
    public float speedH = 2.0f;
    private float yaw = 0.0f;
    
    // Update is called once per frame
    void Update()
    {
        // Move with WASD
        if (Input.GetKey(KeyCode.W)) {
            this.transform.Translate(7 * Time.deltaTime * Vector3.forward);
        }
        if (Input.GetKey(KeyCode.A)) {
            this.transform.Translate(7 * Time.deltaTime * Vector3.left);
        }
        if (Input.GetKey(KeyCode.S)) {
            this.transform.Translate(7 * Time.deltaTime * Vector3.back);
        }
        if (Input.GetKey(KeyCode.D)) {
            this.transform.Translate(7 * Time.deltaTime * Vector3.right);
        }
        
        // Rotate with mouse
        yaw += speedH * Input.GetAxis("Mouse X");
        transform.eulerAngles = new Vector3(transform.eulerAngles.x, yaw, 0.0f);
        
        // Shoot with left mouse button
        // if (Input.GetKey(KeyCode.Mouse0) && Time.timeScale != 0) {
        //     Ray ray = Camera.main.ViewportPointToRay(new Vector3 (0.5f, 0.5f, 0));
        //     Debug.DrawRay(ray.origin, ray.direction*10);
        //     
        //     if (Physics.Raycast(ray, out RaycastHit hit, 10)) {
        //         if (hit.transform.gameObject.CompareTag("Enemy")) {
        //             Destroy(hit.transform.gameObject.transform.parent.gameObject);
        //         }
        //     }
        // }
    }

    public int score = 0;
    
    void OnCollisionEnter(Collision collision) {
        if (collision.gameObject.CompareTag("Enemy"))
        {
            Time.timeScale = 0;
            isDead = true;
            _crosshair.SetActive(false);
            _youDiedText.enabled = true;
            StartCoroutine(FadeInText());
        } else if (collision.gameObject.CompareTag("PointOrb"))
        {
            score++;
            _scoreText.text = "Score: " + score;
            Destroy(collision.gameObject);
        }
    }

    private IEnumerator FadeInText()
    {
        while (alphaValue < 1)
        {
            alphaValue += fadeAwayPerSecond;
            _youDiedText.color = new Color(_youDiedText.color.r, _youDiedText.color.g, _youDiedText.color.b, alphaValue);
            // fadeTime -= Time.deltaTime;
            yield return null;
        }
    }
}
