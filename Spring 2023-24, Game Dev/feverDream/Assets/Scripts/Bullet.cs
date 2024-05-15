using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Bullet : MonoBehaviour
{
    
    public float time = 0.5f;
    
    // Start is called before the first frame update
    void Start()
    {
        Invoke("destroyBullet", time);
    }

    private void destroyBullet()
    {
        Destroy(gameObject);
    }
}
